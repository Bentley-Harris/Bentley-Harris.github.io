#!/usr/bin/env python3
"""
check-site.py — verify the portfolio site is complete and internally consistent.

Run it from the site folder:      python3 check-site.py
No installation, no dependencies. Python 3.6+.

It checks:
  1. Every file the pages reference actually exists
  2. Every project in projects.js has a page, and every page has an entry
  3. data-project-id on each page matches its id in projects.js
  4. No leftover YOUTUBE_VIDEO_ID or 20XX placeholders on live pages
  5. Image file names are lower case (matters once published)
  6. How many [FILL IN] prompts are left, per page

Exit code is 0 if there are no ERRORs, 1 otherwise. Warnings do not fail.
"""
import os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
errors, warnings, notes = [], [], []


def rel(p):
    return os.path.relpath(p, ROOT)


def read(p):
    with open(p, encoding="utf-8", errors="replace") as f:
        return f.read()


# ---------------------------------------------------------------- gather pages
root_pages = [f for f in ("index.html", "projects.html", "resume.html", "contact.html")
              if os.path.exists(os.path.join(ROOT, f))]
proj_dir = os.path.join(ROOT, "projects")
proj_pages = sorted(f for f in os.listdir(proj_dir) if f.endswith(".html")) \
    if os.path.isdir(proj_dir) else []

print("=" * 68)
print("  PORTFOLIO SITE CHECK")
print("=" * 68)
print(f"\nRoot pages    : {len(root_pages)}")
print(f"Project pages : {len(proj_pages)}")

# ---------------------------------------------------------------- projects.js
pjs_path = os.path.join(ROOT, "assets", "js", "projects.js")
entries = []
if not os.path.exists(pjs_path):
    errors.append("assets/js/projects.js is MISSING — the whole site is built from it.")
else:
    src = read(pjs_path)
    body = src[src.find("window.PROJECTS"):]
    for blk in re.findall(r"\{.*?\n  \}", body, re.S):
        d = dict(re.findall(r'(\w+):\s*"([^"]*)"', blk))
        if "id" in d:
            entries.append(d)
    print(f"projects.js   : {len(entries)} entries")
    if not entries:
        errors.append("projects.js parsed to zero projects — likely a syntax error "
                      "(check for a missing or extra comma).")

# --------------------------------------------------- entry <-> page agreement
ids = {e["id"] for e in entries}
page_ids = {p[:-5] for p in proj_pages if p != "_project-template.html"}

for e in entries:
    want = os.path.join(ROOT, e.get("url", ""))
    if e.get("url") and not os.path.exists(want):
        errors.append(f"projects.js entry '{e['id']}' points at {e['url']}, which does not exist.")
    page = os.path.join(proj_dir, e["id"] + ".html")
    if os.path.exists(page):
        m = re.search(r'data-project-id="([^"]*)"', read(page))
        if not m:
            errors.append(f"{e['id']}.html has no data-project-id — prev/next links will not appear.")
        elif m.group(1) != e["id"]:
            errors.append(f"{e['id']}.html has data-project-id=\"{m.group(1)}\" "
                          f"but projects.js id is \"{e['id']}\" — they must match exactly.")

for orphan in sorted(page_ids - ids):
    warnings.append(f"projects/{orphan}.html exists but has no entry in projects.js "
                    f"— it will not appear anywhere on the site.")

# --------------------------------------------------------- referenced assets
referenced = {}
for name in root_pages:
    p = os.path.join(ROOT, name)
    for m in re.findall(r'(?:src|href)="((?:\./)?assets/[^"]+)"', read(p)):
        referenced.setdefault(m.replace("./", ""), set()).add(name)
for name in proj_pages:
    if name == "_project-template.html":
        continue
    p = os.path.join(proj_dir, name)
    for m in re.findall(r'(?:src|href)="\.\./(assets/[^"]+)"', read(p)):
        referenced.setdefault(m, set()).add("projects/" + name)
for e in entries:
    if e.get("thumb"):
        referenced.setdefault(e["thumb"], set()).add("projects.js (card image)")

# main.js references the placeholder tile directly
mjs = os.path.join(ROOT, "assets", "js", "main.js")
if os.path.exists(mjs):
    for m in re.findall(r'path\("(assets/[^"]+)"\)', read(mjs)):
        referenced.setdefault(m, set()).add("assets/js/main.js")
else:
    errors.append("assets/js/main.js is MISSING — filters, lightbox and video will not work.")

missing = {}
for asset, users in referenced.items():
    if "PROJECT-SLUG" in asset:          # the template's own placeholder
        continue
    if not os.path.exists(os.path.join(ROOT, asset)):
        missing.setdefault(asset, users)

print(f"Assets referenced: {len(referenced)}   present: {len(referenced)-len(missing)}   missing: {len(missing)}")

# style.css is special: without it every page renders as plain black-on-white
if "assets/css/style.css" in missing:
    errors.append("assets/css/style.css is MISSING. Every page will render UNSTYLED "
                  "until you copy your own stylesheet in. This is expected in the "
                  "delivered zip — copy it from your local site folder.")
    del missing["assets/css/style.css"]

img_missing = sorted(a for a in missing if a.startswith("assets/img/"))
other_missing = sorted(a for a in missing if not a.startswith("assets/img/"))

for a in other_missing:
    errors.append(f"missing file: {a}")

# ------------------------------------------------------------- placeholders
live_yt, live_20xx, fillins = [], [], {}
for name in root_pages + ["projects/" + p for p in proj_pages]:
    if name.endswith("_project-template.html"):
        continue
    s = read(os.path.join(ROOT, name))
    if "YOUTUBE_VIDEO_ID" in s:
        live_yt.append(name)
    if "20XX" in s:
        live_20xx.append(name)
    n = s.count("FILL IN")
    if n:
        fillins[name] = n

for f in live_yt:
    errors.append(f"{f} still contains a YOUTUBE_VIDEO_ID placeholder.")
for f in live_20xx:
    warnings.append(f"{f} still contains 20XX.")

if entries:
    bad_year = [e["id"] for e in entries if e.get("year") == "20XX"]
    for b in bad_year:
        errors.append(f"projects.js entry '{b}' still has year 20XX.")

# --------------------------------------------------------------- lower case
for dirpath, _, files in os.walk(os.path.join(ROOT, "assets", "img")):
    for f in files:
        if f != f.lower():
            errors.append(f"{rel(os.path.join(dirpath,f))} has capital letters. "
                          f"Web servers are case sensitive; rename it to lower case.")

# ------------------------------------------------------------------ report
def section(title, items, bullet="-"):
    if items:
        print(f"\n{title}")
        for i in items:
            print(f"  {bullet} {i}")

if img_missing:
    print(f"\nMISSING IMAGES ({len(img_missing)}) — drop these in from your local folder:")
    bydir = {}
    for a in img_missing:
        bydir.setdefault(os.path.dirname(a), []).append(os.path.basename(a))
    for d in sorted(bydir):
        print(f"  {d}/")
        print(f"      {', '.join(sorted(bydir[d]))}")

section(f"ERRORS ({len(errors)}) — these will break something:", errors, "x")
section(f"WARNINGS ({len(warnings)}):", warnings, "!")

if fillins:
    print(f"\n[FILL IN] prompts remaining ({sum(fillins.values())} across {len(fillins)} pages):")
    for f in sorted(fillins, key=lambda k: -fillins[k]):
        print(f"  {fillins[f]:>3}  {f}")

print("\n" + "=" * 68)
if errors:
    print(f"  RESULT: {len(errors)} error(s). See above.")
else:
    print("  RESULT: no errors. Structure and links are consistent.")
    if img_missing:
        print(f"  ({len(img_missing)} images still to be dropped in.)")
print("=" * 68)

sys.exit(1 if errors else 0)

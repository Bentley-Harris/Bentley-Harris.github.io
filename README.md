# Portfolio website

A plain HTML, CSS and JavaScript website. There is no build step, no npm, no
framework and nothing to install. You edit the files in a text editor, and
what you see in the files is exactly what gets published.

**To look at it right now:** find `index.html` and double-click it. It opens in
your browser and everything works, including the project grid, the filters and
the image lightbox. You do not need a web server to work on this site.

---

## Contents

1. [What each file does](#1-what-each-file-does)
2. [Content checklist — what you still need to supply](#2-content-checklist)
3. [Find and replace list](#3-find-and-replace-list)
4. [Editing text](#4-editing-text)
5. [Adding photos](#5-adding-photos)
6. [Adding a new project](#6-adding-a-new-project)
7. [Adding a YouTube video](#7-adding-a-youtube-video)
8. [Publishing on GitHub Pages](#8-publishing-on-github-pages)
9. [Simpler alternative: drag and drop hosting](#9-simpler-alternative-drag-and-drop-hosting)
10. [Adding a custom domain later](#10-adding-a-custom-domain-later)
11. [When something breaks](#11-when-something-breaks)
12. [Rules worth keeping](#12-rules-worth-keeping)

---

## 1. What each file does

```
index.html                 Home page: intro, four featured projects, skills
projects.html              All projects, with the category filter buttons
resume.html                Education, awards, skills, future plans
contact.html               Email, LinkedIn, GitHub
_project-template.html     Copy this to make a new project page
README.md                  This file
.nojekyll                  Leave it. Explained at the end of section 8.

assets/css/style.css       Every style on the site. The only stylesheet.
assets/js/projects.js      THE FILE YOU WILL EDIT MOST. The list of projects.
assets/js/main.js          Filters, lightbox, video, dark mode. Rarely edited.
assets/img/placeholder.svg The grey "photo goes here" tile
assets/img/<project-id>/   One folder of photos per project
assets/files/resume.pdf    Your resume. You need to add this file.

projects/                  One HTML file per project. 19 of them.
```

Two files do most of the work:

- **`assets/js/projects.js`** holds the list of every project. The projects
  page, the featured cards on the home page and the previous/next links at the
  bottom of each project page are all built from that one list. Add a project
  there and it appears in all three places automatically.
- **`assets/css/style.css`** holds every style. The colours, fonts and widths
  are all set in a block of variables at the very top, so you can change the
  entire look of the site by editing about fifteen lines.

---

## 2. Content checklist

Everything below still needs your input. Nothing here is hard, but the site is
not finished until these are done.

- [ ] **Full name** — appears in the header, the footer, the page titles and
      the sharing tags on every page. Use find and replace, see section 3.
- [ ] **Professional email address** — split across two attributes so it is
      harder to scrape. See section 3.
- [ ] **LinkedIn URL**
- [ ] **GitHub URL**
- [ ] **University, degree title, discipline, expected graduation year** —
      in `resume.html` and `index.html`
- [ ] **Real years for every project** — every project currently says `20XX`
- [ ] **A photo of yourself** — optional but recommended. Head and shoulders,
      or a photo of you working in the workshop. Save as
      `assets/img/portrait.jpg`, or delete the `<figure>` block in
      `index.html` if you would rather not have one.
- [ ] **One strong hero photo per project** — saved as `thumb.jpg` in that
      project's image folder. This is the single highest-impact thing on the
      list. The cards look bare until they are real photos.
- [ ] **Resume PDF** — save it as `assets/files/resume.pdf`. Until you do,
      the three "download resume" links will lead to a not-found page. If you
      do not want to publish a PDF, delete those links from `index.html`,
      `resume.html` and `contact.html`.
- [ ] **YouTube video IDs** — for the three pages with a video block:
      the floating house, the fish tank automation and the EMP circuit.
      See section 7. Delete the block if there is no video.
- [ ] **"Future plans" paragraph** — in `resume.html`. Two to four sentences.
- [ ] **Every `[FILL IN: ...]` prompt on the project pages** — these appear in
      square brackets in the visible text, so they are impossible to miss when
      you read the page in a browser. Each one asks for something specific
      that only you know. Work through them page by page.
- [ ] **A social sharing image** — a 1200 x 630 pixel image saved as
      `assets/img/og-image.jpg`. This is what shows when you paste a link to
      your site into LinkedIn. A good photo of your best project works well.

**Search the whole folder for `FILL IN` to find every remaining spot.** Most
text editors can search across all files at once — in VS Code it is
Ctrl+Shift+F, or Cmd+Shift+F on a Mac.

---

## 3. Find and replace list

The fastest way to get most of the way there. Open the folder in a text editor
and replace across all files:

| Find | Replace with | Roughly |
|---|---|---|
| `YOUR NAME` | your full name | 100+ |
| `YOUR-LINKEDIN` | your LinkedIn handle | 50+ |
| `YOUR-GITHUB` | your GitHub username | 50+ |
| `YOUR-USERNAME` | your GitHub username | 50+ |
| `[YOUR UNIVERSITY]` | your university | 2 |
| `[DISCIPLINE]` | your engineering discipline | 1 |
| `[CITY]` | your city | 1 |
| `20XX` | the real year | 40+ |

**Careful with `20XX`** — it is a different year on different projects, so do
those one at a time rather than replacing all at once.

**Your email is deliberately not a single string.** It is split in two so that
address-harvesting bots reading the page source do not find a complete
address. Find `firstname.lastname` and `example.com` and replace them with the
two halves of your address. For example, for `jane.smith@gmail.com`:

```html
data-email-user="jane.smith" data-email-domain="gmail.com"
```

On `contact.html` also update the visible text to `jane.smith [at] gmail.com`.
JavaScript joins the two halves and turns it into a working link when the page
loads.

---

## 4. Editing text

Any text editor works. [VS Code](https://code.visualstudio.com/) is free and
will colour the code so it is easier to read, but Notepad or TextEdit will do
the job.

Edit a file, save it, then switch to your browser and press refresh. That is
the whole loop.

Things inside `<!-- these -->` are comments. They are notes to you and do not
appear on the page. Delete them once you have acted on them.

**Do not add a `<style>` block to a page.** Every style lives in
`assets/css/style.css` so that all pages stay consistent. If you want to change
how something looks, change it there and every page updates together.

---

## 5. Adding photos

### Resize your photos first. This matters more than it sounds.

A photo straight off a phone is often 4000 pixels wide and 5 MB. Your browser
shows it at about 800 pixels, so all that extra data is downloaded and thrown
away. Ten of those on one page is 50 MB, which:

- takes a long time to load on a phone, which is where a lot of people will
  read your site
- burns through mobile data for the person looking at it
- makes GitHub slow to work with, since Git stores every version you upload

Resized properly, that same page loads almost instantly and looks identical.

**Target: 1600 pixels wide maximum, JPEG or WebP, under about 300 KB each.**
For the small `thumb.jpg` card images, 800 x 600 is plenty.

**How to resize:**

- **Mac:** open in Preview, then Tools > Adjust Size, set width to 1600.
- **Windows:** open in Photos, then the three dots > Resize.
- **Any computer:** go to [squoosh.app](https://squoosh.app), drag your photo
  in, set the width on the right and download. Nothing to install, and it shows
  you the file size before and after.

### Where photos go

Each project has its own folder, named exactly the same as the project's `id`:

```
assets/img/g-clamp/thumb.jpg     <- the card image on the projects page
assets/img/g-clamp/01.jpg        <- first photo on the project page
assets/img/g-clamp/02.jpg
assets/img/g-clamp/03.jpg
```

### After adding a photo, do these two things

1. **Update the alt text.** Every image has an `alt="..."` describing what is
   in the shot. It is read aloud to people using a screen reader, and it shows
   if an image fails to load. Describe the photo, do not just repeat the title.
2. **Update `width` and `height`** to the real pixel size of your file. The
   browser uses them to reserve the right space before the image arrives, which
   stops the page jumping around while it loads.

Until you add a photo, the grey "photo goes here" tile appears instead. Nothing
breaks, and the layout is already correct.

---

## 6. Adding a new project

Five steps. Say the new project is a hydraulic press.

**Step 1 — Pick an id.** Lower case, hyphens instead of spaces, no
punctuation: `hydraulic-press`. This one word becomes the file name, the image
folder name and the link, so keep it simple.

**Step 2 — Add it to `assets/js/projects.js`.** Copy an existing block, paste
it into the list and edit it. Watch the commas: every block ends with `},`
except the last one in the list, which ends with `}`.

```js
  {
    id: "hydraulic-press",
    title: "Hydraulic Press",
    year: "2026",
    categories: ["Fabrication & Manufacturing"],
    blurb: "A one sentence description, under about 90 characters.",
    thumb: "assets/img/hydraulic-press/thumb.jpg",
    tags: ["Welding", "Hydraulics"],
    url: "projects/hydraulic-press.html",
    featured: false
  },
```

The `categories` must be spelled exactly as they are on the filter buttons:
`Electronics & Embedded`, `Fabrication & Manufacturing`, or
`CAD & 3D Printing`. A project can have two if it genuinely spans both.

Where you put the block in the list is where it appears on the projects page,
and it also sets the order of the previous/next links.

**Step 3 — Make the page.** Copy `_project-template.html` into the `projects/`
folder and rename it `hydraulic-press.html`. Open it and work through every
`FILL IN`. The one thing that must match exactly is near the top:

```html
<body data-project-id="hydraulic-press">
```

That has to be identical to the `id` you used in step 2, or the previous/next
links at the bottom of the page will not appear.

**Step 4 — Add the photos.** Make a folder `assets/img/hydraulic-press/` and
put `thumb.jpg` and your numbered photos in it, resized as in section 5.

**Step 5 — Check it.** Open `projects.html` in your browser. The new card
should be there, the filter buttons should include it in the right category,
and clicking it should open your new page.

To feature a project on the home page, set `featured: true`. Keep that to three
or four projects, or the home page stops being a selection.

---

## 7. Adding a YouTube video

Videos are not stored on your site — they stay on YouTube and your page links
to them. The page only loads YouTube once a visitor actually clicks play, which
keeps the page fast and means YouTube does not track people who never watch.

**To get the video ID,** open your video on YouTube and look at the address:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                ^^^^^^^^^^^
```

The ID is the part after `v=`. Here it is `dQw4w9WgXcQ`.

Paste it into the project page, replacing `YOUTUBE_VIDEO_ID`:

```html
<div class="video" data-youtube-id="dQw4w9WgXcQ" ...>
```

You also need a still image for the play button to sit on. Take a screenshot of
the video, resize it to 1280 x 720, and save it as `video-thumb.jpg` in that
project's image folder.

If a project has no video, delete the whole `<div class="video">` block and the
`<h2>Video</h2>` above it.

---

## 8. Publishing on GitHub Pages

Free, gives you a real web address, keeps a history of every change, and lets
you add your own domain name later. Budget about twenty minutes the first time.

**1. Make a GitHub account** at [github.com](https://github.com). Choose your
username carefully — it becomes part of your web address, and recruiters will
see it. Something close to your real name is a safe choice.

**2. Create a repository.** Click the `+` at the top right, then
**New repository**.

- Name it exactly `yourusername.github.io`, using your actual username. This
  exact name is what makes GitHub publish it at the top level.
- Set it to **Public**. It has to be public for free hosting.
- Do not tick "Add a README file" — you already have one.
- Click **Create repository**.

**3. Upload your files.** On the empty repository page, click
**uploading an existing file**.

Open your site folder, select everything inside it, and drag it onto the
browser window. Upload the *contents* of the folder, not the folder itself —
`index.html` must end up at the top level of the repository, not inside another
folder. If after uploading you see one folder and nothing else, that is the
mistake. Delete it and re-upload the contents.

Scroll down, type something in the description box like "first upload", and
click **Commit changes**.

**4. Turn on Pages.** Go to **Settings** (the tab along the top of the
repository), then **Pages** in the left sidebar.

- Under Source, choose **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- Click **Save**

**5. Wait, then visit your site.** It takes one to five minutes the first time.
Your address is `https://yourusername.github.io`. Refresh if it is not there
immediately.

**6. Go back and fix the sharing tags.** Now that you know your address, find
and replace `https://YOUR-USERNAME.github.io` across all files with your real
address. These have to be full addresses for LinkedIn link previews to work.

### Making changes later

Two options.

**Through the website:** click a file in your repository, click the pencil
icon, edit, and click **Commit changes**. Fine for fixing a typo.

**With GitHub Desktop** (recommended once you are adding projects regularly):
install [GitHub Desktop](https://desktop.github.com), clone your repository to
your computer, and edit the files locally in your normal editor. When you are
happy, write a short summary, click **Commit**, then **Push**. Your site
updates within a minute or two.

### What `.nojekyll` is for

GitHub Pages runs your files through a system called Jekyll, which ignores any
file whose name starts with an underscore. That would hide
`_project-template.html`. The empty `.nojekyll` file switches that behaviour
off. Leave it there and you never have to think about it again.

---

## 9. Simpler alternative: drag and drop hosting

If GitHub feels like too much to start with, you can have the site online in
about two minutes:

- **Netlify Drop** — go to [app.netlify.com/drop](https://app.netlify.com/drop)
  and drag your whole site folder onto the page. It gives you an address
  straight away.
- **Cloudflare Pages** — similar, at
  [pages.cloudflare.com](https://pages.cloudflare.com).

The trade-off: no version history, and to update the site you re-drag the whole
folder every time. Good for getting something live today. GitHub Pages is
better once you are adding projects regularly, and you can move over later
without changing a single file.

---

## 10. Adding a custom domain later

A domain like `yourname.com` costs roughly $15 to $30 AUD a year. Worth it if
you are handing the address to employers.

1. Buy a domain from any registrar — Namecheap, Cloudflare, VentraIP and
   others all work.
2. In your GitHub repository, go to **Settings > Pages > Custom domain**, type
   your domain, and click **Save**. GitHub creates a file called `CNAME` in
   your repository.
3. At your registrar, open the DNS settings and add these records:

   ```
   Type    Name    Value
   A       @       185.199.108.153
   A       @       185.199.109.153
   A       @       185.199.110.153
   A       @       185.199.111.153
   CNAME   www     yourusername.github.io
   ```

   Check GitHub's current documentation for those IP addresses in case they
   have changed.
4. DNS changes take anywhere from a few minutes to a day. Once it works, tick
   **Enforce HTTPS** on the same GitHub settings page.
5. Update `https://YOUR-USERNAME.github.io` in the sharing tags one more time,
   to your new domain.

---

## 11. When something breaks

**The projects page is empty.**
`assets/js/projects.js` has a syntax error, usually a missing or extra comma
between blocks, or a missing quote mark. Press F12 in your browser, click the
Console tab, and it will name the line. Compare that block against the one
above it.

**A project's card shows but the page gives a 404.**
The `url` in `projects.js` does not match the actual file name in `projects/`.
They have to match character for character.

**Previous/next links are missing at the bottom of a project page.**
The `data-project-id` on the `<body>` tag does not match the `id` in
`projects.js`.

**Images work on your computer but not once published.**
Almost always capital letters. Web servers treat `Photo.JPG` and `photo.jpg` as
different files; Windows and Mac usually do not. Keep every file name lower
case with no spaces, and you will never hit this.

**Changes are not showing up.**
Hard refresh: Ctrl+Shift+R, or Cmd+Shift+R on a Mac. If you have just pushed to
GitHub, give it a minute or two.

**The page looks unstyled, just black text on white.**
The stylesheet is not loading. Pages in the `projects/` folder must link to
`../assets/css/style.css` with the `../` in front. Pages in the main folder
must not have it.

**Everything on a project page has broken at once.**
Check the `<html lang="en" data-root="../">` tag at the top. Pages inside
`projects/` need `data-root="../"`. Pages in the main folder need
`data-root=""`.

---

## 12. Rules worth keeping

The site was built to a specific brief, and these are the parts worth
protecting as you add to it.

**Restraint is the design.** No scroll animations, no fade-ins, no counters, no
carousels. The only movement is a small hover state on cards, a fade when the
lightbox opens, and smooth scrolling on anchor links. Everything else is
deliberately still. That is what makes it read as an engineer's site rather
than a marketing page.

**Keep the writing specific.** "Machined the screw on a metal lathe" is worth
more than "leveraged advanced manufacturing techniques". Every project page
should answer four things: what was it, why did you build it, what did it
involve technically, and how did it turn out. Numbers beat adjectives every
time.

**Write the "What I learned" sections properly.** What went wrong, what you
would change. It costs nothing and it is often the part an interviewer asks
about, because it shows judgement rather than just output.

**No frameworks, no build step, no CDN links.** Everything the site needs is in
this folder. It will still work in ten years, and it will still work with no
internet connection. That is worth more than any library you might add.

**Keep every image's alt text accurate and every heading in order** (h1, then
h2, then h3 — never skipping a level). That is what keeps the site usable with
a screen reader, and it takes no extra effort if you do it as you go.

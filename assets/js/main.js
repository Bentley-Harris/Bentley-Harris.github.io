/* ==========================================================================
   MAIN.JS — all site behaviour
   Plain JavaScript, no libraries, no build step.

   You should not need to edit this file to add a project. Everything here is
   driven by the data in projects.js and by attributes in the HTML.

   WHAT THIS FILE DOES
     1. Works out how deep the current page is, so links work everywhere
     2. Marks the current page in the navigation
     3. Builds the project cards on the home page and the projects page
     4. Runs the category filter buttons
     5. Lists the experiments on the projects page
     6. Builds the previous/next links on project pages
     7. Click-to-enlarge image lightbox
     8. Loads YouTube only after the play button is clicked
     9. Light/dark toggle, remembered between visits
     10. Assembles email addresses so scrapers cannot read them in the source
     11. Puts the current year in the footer

   Every part checks that its elements exist first, so pages that do not use a
   feature are simply skipped.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. PATHS
     Pages in the projects/ folder sit one level down, so they carry
     <html data-root="../">. Pages in the root carry data-root="".
     Every path from projects.js is passed through path() below.
     ------------------------------------------------------------------ */

  var ROOT = document.documentElement.getAttribute("data-root") || "";

  function path(p) {
    if (!p) return "";
    return ROOT + p;
  }

  var PLACEHOLDER = path("assets/img/placeholder.svg");

  var PROJECTS = window.PROJECTS || [];
  var EXPERIMENTS = window.EXPERIMENTS || [];

  /* Escapes text before it goes into the page, so a title containing an
     ampersand or an angle bracket cannot break the markup. */
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Swaps in the grey placeholder tile if a photo is missing, so the layout
     never shows a broken image icon while you are still adding photos. */
  function guardImages(container) {
    var images = container.querySelectorAll("img");
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener("error", function () {
        if (this.getAttribute("data-fallback-used")) return;
        this.setAttribute("data-fallback-used", "true");
        this.src = PLACEHOLDER;
      });
    }
  }


  /* ------------------------------------------------------------------
     2. MARK THE CURRENT PAGE IN THE NAV
     Any page inside projects/ counts as the Projects section.
     ------------------------------------------------------------------ */

  function markCurrentNavItem() {
    var links = document.querySelectorAll(".nav-list a");
    if (!links.length) return;

    var here = window.location.pathname.split("/").pop() || "index.html";
    var inProjectsFolder = window.location.pathname.indexOf("/projects/") !== -1;

    for (var i = 0; i < links.length; i++) {
      var target = links[i].getAttribute("href").split("/").pop();
      var isMatch = target === here ||
                    (inProjectsFolder && target === "projects.html");
      if (isMatch) links[i].setAttribute("aria-current", "page");
    }
  }


  /* ------------------------------------------------------------------
     3. PROJECT CARDS
     Any element with data-projects="featured" or data-projects="all"
     gets filled with cards. data-heading sets the heading level so the
     page keeps a correct heading order.
     ------------------------------------------------------------------ */

  function cardHTML(project, level) {
    var tag = "h" + (level || 3);
    var category = (project.categories && project.categories[0]) || "";
    var thumb = project.thumb ? path(project.thumb) : PLACEHOLDER;
    var categoryAttr = (project.categories || []).join("|");

    return '' +
      '<li class="card" data-categories="' + esc(categoryAttr) + '">' +
        '<span class="card-thumb">' +
          '<img src="' + esc(thumb) + '" alt="' + esc(project.title) + '"' +
          ' width="800" height="600" loading="lazy">' +
        '</span>' +
        '<' + tag + ' class="card-title">' +
          '<a href="' + esc(path(project.url)) + '">' + esc(project.title) + '</a>' +
        '</' + tag + '>' +
        '<p class="card-blurb">' + esc(project.blurb) + '</p>' +
        '<p class="card-meta">' + esc(project.year) +
          (category ? ' &middot; ' + esc(category) : '') +
        '</p>' +
      '</li>';
  }

  function renderCards() {
    var targets = document.querySelectorAll("[data-projects]");

    for (var i = 0; i < targets.length; i++) {
      var target = targets[i];
      var mode = target.getAttribute("data-projects");
      var level = parseInt(target.getAttribute("data-heading"), 10) || 3;

      var list = PROJECTS;
      if (mode === "featured") {
        list = PROJECTS.filter(function (p) { return p.featured; });
      }

      var html = "";
      for (var j = 0; j < list.length; j++) {
        html += cardHTML(list[j], level);
      }

      target.innerHTML = html;
      guardImages(target);
    }
  }


  /* ------------------------------------------------------------------
     4. CATEGORY FILTERS
     Buttons carry data-filter="All" or a category name. Filtering is a
     plain show/hide with no animation.
     ------------------------------------------------------------------ */

  function setUpFilters() {
    var bar = document.querySelector("[data-filter-bar]");
    var grid = document.querySelector('[data-projects="all"]');
    if (!bar || !grid) return;

    var buttons = bar.querySelectorAll(".filter");
    var status = document.querySelector("[data-filter-status]");

    function apply(value) {
      var cards = grid.querySelectorAll(".card");
      var shown = 0;

      for (var i = 0; i < cards.length; i++) {
        var categories = (cards[i].getAttribute("data-categories") || "").split("|");
        var visible = value === "All" || categories.indexOf(value) !== -1;
        cards[i].classList.toggle("is-hidden", !visible);
        if (visible) shown++;
      }

      for (var b = 0; b < buttons.length; b++) {
        var pressed = buttons[b].getAttribute("data-filter") === value;
        buttons[b].setAttribute("aria-pressed", pressed ? "true" : "false");
      }

      if (status) {
        status.textContent = value === "All"
          ? "Showing all " + shown + " projects"
          : "Showing " + shown + (shown === 1 ? " project in " : " projects in ") + value;
      }
    }

    for (var k = 0; k < buttons.length; k++) {
      buttons[k].addEventListener("click", function () {
        apply(this.getAttribute("data-filter"));
      });
    }

    apply("All");
  }


  /* ------------------------------------------------------------------
     5. EXPERIMENTS LIST
     ------------------------------------------------------------------ */

  function renderExperiments() {
    var section = document.querySelector("[data-experiments-section]");
    var list = document.querySelector("[data-experiments]");
    if (!list) return;

    if (!EXPERIMENTS.length) {
      if (section) section.style.display = "none";
      return;
    }

    var html = "";
    for (var i = 0; i < EXPERIMENTS.length; i++) {
      html += '<li><strong>' + esc(EXPERIMENTS[i].title) + '</strong> &mdash; ' +
              esc(EXPERIMENTS[i].note) + '</li>';
    }
    list.innerHTML = html;
  }


  /* ------------------------------------------------------------------
     6. PREVIOUS / NEXT LINKS
     A project page carries <body data-project-id="the-id">. The list
     wraps around, so the last project links back to the first.
     ------------------------------------------------------------------ */

  function renderPager() {
    var pager = document.querySelector("[data-pager]");
    if (!pager) return;

    var id = document.body.getAttribute("data-project-id");
    var index = -1;

    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].id === id) { index = i; break; }
    }

    if (index === -1 || PROJECTS.length < 2) {
      pager.style.display = "none";
      return;
    }

    var previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(index + 1) % PROJECTS.length];

    pager.innerHTML =
      '<div class="pager-prev">' +
        '<span class="eyebrow">Previous</span>' +
        '<a href="' + esc(path(previous.url)) + '">' + esc(previous.title) + '</a>' +
      '</div>' +
      '<div class="pager-next">' +
        '<span class="eyebrow">Next</span>' +
        '<a href="' + esc(path(next.url)) + '">' + esc(next.title) + '</a>' +
      '</div>';
  }


  /* ------------------------------------------------------------------
     7. LIGHTBOX
     Any <button class="shot-btn"> wrapping an image becomes click to
     enlarge. Closes with Escape, the close button, or the backdrop.
     ------------------------------------------------------------------ */

  function setUpLightbox() {
    var buttons = document.querySelectorAll(".shot-btn");
    if (!buttons.length) return;

    var box = null;
    var boxImage = null;
    var boxCaption = null;
    var closeButton = null;
    var lastFocused = null;

    function build() {
      box = document.createElement("div");
      box.className = "lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.setAttribute("aria-label", "Enlarged image");

      boxImage = document.createElement("img");
      boxImage.alt = "";

      boxCaption = document.createElement("p");
      boxCaption.className = "lightbox-caption";

      closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "lightbox-close";
      closeButton.textContent = "Close";

      box.appendChild(boxImage);
      box.appendChild(boxCaption);
      box.appendChild(closeButton);
      document.body.appendChild(box);

      closeButton.addEventListener("click", close);

      box.addEventListener("click", function (event) {
        if (event.target === box) close();
      });

      box.addEventListener("keydown", function (event) {
        if (event.key === "Escape") close();
        /* Only one control inside, so keep Tab on it rather than letting
           focus wander behind the overlay. */
        if (event.key === "Tab") event.preventDefault();
      });
    }

    function open(button) {
      if (!box) build();

      var image = button.querySelector("img");
      var figure = button.closest("figure");
      var caption = figure ? figure.querySelector("figcaption") : null;
      var full = button.getAttribute("data-full");

      lastFocused = button;
      boxImage.src = full || (image ? image.src : "");
      boxImage.alt = image ? image.alt : "";
      boxCaption.textContent = caption ? caption.textContent : "";

      document.body.classList.add("lightbox-open");
      box.style.display = "flex";
      /* Next frame, so the fade actually runs. Falls back to a timer if
         requestAnimationFrame is unavailable, so that focus always moves
         to the close button even if the fade is skipped. */
      var nextFrame = window.requestAnimationFrame ||
                      function (fn) { return window.setTimeout(fn, 16); };
      nextFrame(function () {
        box.classList.add("is-open");
      });
      closeButton.focus();
    }

    function close() {
      if (!box) return;
      box.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
      window.setTimeout(function () {
        box.style.display = "none";
        boxImage.src = "";
      }, 130);
      if (lastFocused) lastFocused.focus();
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () { open(this); });
    }
  }


  /* ------------------------------------------------------------------
     8. YOUTUBE FACADE
     The page holds only a thumbnail until the visitor clicks play. The
     iframe is then loaded from youtube-nocookie.com.
     ------------------------------------------------------------------ */

  function setUpVideos() {
    var videos = document.querySelectorAll("[data-youtube-id]");

    for (var i = 0; i < videos.length; i++) {
      (function (holder) {
        var button = holder.querySelector(".video-play");
        if (!button) return;

        button.addEventListener("click", function () {
          var id = holder.getAttribute("data-youtube-id");
          if (!id || id.indexOf("YOUTUBE_VIDEO_ID") === 0) return;

          /* YouTube rejects embeds that arrive without a valid referrer and
             shows "Error 153: Video player configuration error". Two things
             matter here:
               1. referrerPolicy below must send an origin. The default on
                  some setups strips it entirely, which trips error 153.
               2. The page must be served over http:// or https://. Opened
                  straight off disk as file:// there is no origin to send,
                  so every video fails no matter what this code does. */
          if (window.location.protocol === "file:") {
            console.warn(
              "Videos will not play from file://. YouTube needs a real " +
              "origin. Serve the folder instead, e.g. run " +
              "`python3 -m http.server 8000` in the site folder and open " +
              "http://localhost:8000. Everything else works fine from disk."
            );
          }

          var frame = document.createElement("iframe");
          frame.referrerPolicy = "strict-origin-when-cross-origin";
          frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
          frame.src = "https://www.youtube-nocookie.com/embed/" +
                      encodeURIComponent(id) + "?autoplay=1&rel=0";
          frame.title = holder.getAttribute("data-video-title") || "Project video";
          frame.allow = "accelerometer; autoplay; encrypted-media; " +
                        "gyroscope; picture-in-picture; web-share";
          frame.setAttribute("allowfullscreen", "");

          holder.innerHTML = "";
          holder.appendChild(frame);
        });
      })(videos[i]);
    }
  }


  /* ------------------------------------------------------------------
     9. LIGHT / DARK TOGGLE
     The matching three-line script in each page's <head> applies the
     saved choice before the page paints, which avoids a white flash.
     To remove dark mode: delete this function, the button in the header
     of each page, that head script, and the dark blocks in style.css.
     ------------------------------------------------------------------ */

  function setUpThemeToggle() {
    var button = document.querySelector("[data-theme-toggle]");
    if (!button) return;

    function currentTheme() {
      var set = document.documentElement.getAttribute("data-theme");
      if (set) return set;
      return window.matchMedia &&
             window.matchMedia("(prefers-color-scheme: dark)").matches
             ? "dark" : "light";
    }

    function label() {
      var next = currentTheme() === "dark" ? "light" : "dark";
      button.textContent = next === "dark" ? "Dark" : "Light";
      button.setAttribute("aria-label", "Switch to " + next + " mode");
    }

    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });

    label();
  }


  /* ------------------------------------------------------------------
     10. EMAIL ADDRESSES
     The address is stored in two attributes and joined here, so it does
     not appear as a complete address in the page source. Without
     JavaScript the visitor still sees a readable address.
     ------------------------------------------------------------------ */

  function setUpEmailLinks() {
    var links = document.querySelectorAll("[data-email-user]");

    for (var i = 0; i < links.length; i++) {
      var user = links[i].getAttribute("data-email-user");
      var domain = links[i].getAttribute("data-email-domain");
      if (!user || !domain) continue;

      var address = user + "@" + domain;
      links[i].setAttribute("href", "mailto:" + address);
      if (!links[i].hasAttribute("data-keep-text")) {
        links[i].textContent = address;
      }
    }
  }


  /* ------------------------------------------------------------------
     11. FOOTER YEAR
     ------------------------------------------------------------------ */

  function setUpYear() {
    var slots = document.querySelectorAll("[data-current-year]");
    for (var i = 0; i < slots.length; i++) {
      slots[i].textContent = new Date().getFullYear();
    }
  }


  /* ------------------------------------------------------------------
     GO
     ------------------------------------------------------------------ */

  function init() {
    markCurrentNavItem();
    renderCards();
    setUpFilters();
    renderExperiments();
    renderPager();
    setUpLightbox();
    setUpVideos();
    setUpThemeToggle();
    setUpEmailLinks();
    setUpYear();
    guardImages(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();

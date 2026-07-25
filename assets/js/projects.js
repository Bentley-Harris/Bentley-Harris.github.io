/* ==========================================================================
   PROJECT DATA
   This is the file you will edit most often. It is the single source of
   truth for the projects page, the featured cards on the home page, and the
   previous/next links at the bottom of every project page.

   TO ADD A PROJECT
     1. Copy any object below, paste it into the list, and edit the values.
     2. Copy _project-template.html into the projects/ folder and rename it
        to match the "url" value you used.
     3. Put the photos in assets/img/<id>/
   Full instructions are in README.md.

   FIELD REFERENCE
     id         Short slug. Must be unique. Also used as the image folder name
                and must match the data-project-id on the project page.
     title      Shown on cards and in links.
     year       Shown on cards. A string, so "2024" or "2023-2024" both work.
     categories One or two of, spelled EXACTLY like this:
                  "Electronics & Embedded"
                  "Fabrication & Manufacturing"
                  "CAD & 3D Printing"
                These drive the filter buttons. The first one shows on the card.
     blurb      One sentence. Keep it factual and under about 90 characters.
     thumb      Path to the card image, relative to the site root.
     tags       Two to four short labels. Shown on the project page.
     url        Path to the project page, relative to the site root.
     featured   true puts the project on the home page. Keep this to 3 or 4.

   ORDER MATTERS: the order of this list is the order of the projects page,
   and it is also the order the previous/next links follow.
   ========================================================================== */

window.PROJECTS = [

{
    id: "self-stabilising-floating-house",
    title: "Self-Stabilising Floating House",
    year: "2026",
    categories: ["Electronics & Embedded", "CAD & 3D Printing"],
    blurb: "A floating structure that keeps itself level using an IMU and a PID control loop.",
    thumb: "assets/img/self-stabilising-floating-house/thumb.jpg",
    tags: ["Arduino", "PID control", "KiCad", "CAD", "Telemetry"],
    url: "projects/self-stabilising-floating-house.html",
    featured: true
  },

{
    id: "handheld-message-console",
    title: "Handheld Message Console",
    year: "2026",
    categories: ["Electronics & Embedded", "CAD & 3D Printing"],
    blurb: "A 3D printed handheld device with an OLED menu system and 365 stored messages.",
    thumb: "assets/img/handheld-message-console/thumb.jpg",
    tags: ["Arduino", "OLED", "3D printing", "Soldering"],
    url: "projects/handheld-message-console.html",
    featured: true
  },

{
    id: "supercapacitor-bank",
    title: "Supercapacitor Bank",
    year: "2025",
    categories: ["Electronics & Embedded", "Fabrication & Manufacturing"],
    blurb: "A monitored capacitor bank with per-cell voltage readout and controlled discharge.",
    thumb: "assets/img/supercapacitor-bank/thumb.jpg",
    tags: ["Arduino", "Voltage monitoring", "OLED", "Machining"],
    url: "projects/supercapacitor-bank.html",
    featured: true
  },

{
    id: "fish-tank-automation",
    title: "Fish Tank Automation System",
    year: "2026",
    categories: ["Electronics & Embedded", "CAD & 3D Printing"],
    blurb: "Scheduled tank lighting and a 3D printed feeder that has run unattended for a month.",
    thumb: "assets/img/fish-tank-automation/thumb.jpg",
    tags: ["Arduino", "MOSFET switching", "RTC", "3D printing"],
    url: "projects/fish-tank-automation.html",
    featured: true
  },

{
    id: "rocket-stove",
    title: "Rocket Stove",
    year: "2024",
    categories: ["Fabrication & Manufacturing"],
    blurb: "A J-tube stove formed from hollow square bar, with a fabricated trapdoor closure.",
    thumb: "assets/img/rocket-stove/thumb.jpg",
    tags: ["Welding", "Sheet metal", "Angle grinder"],
    url: "projects/rocket-stove.html",
    featured: false
  },

{
    id: "g-clamp",
    title: "G-Clamp",
    year: "2025",
    categories: ["Fabrication & Manufacturing"],
    blurb: "A working G-clamp built from raw stock, including a lathe-machined screw assembly.",
    thumb: "assets/img/g-clamp/thumb.jpg",
    tags: ["Metal lathe", "Threading", "Welding"],
    url: "projects/g-clamp.html",
    featured: false
  },

{
    id: "emp-circuit",
    title: "EMP Circuit",
    year: "2026",
    categories: ["Electronics & Embedded"],
    blurb: "A high-voltage experiment in energy storage and fast switching through a coil.",
    thumb: "assets/img/emp-circuit/thumb.jpg",
    tags: ["High voltage", "Energy storage", "Experiment"],
    url: "projects/emp-circuit.html",
    featured: false
  },

{
    id: "solder-fume-extractor-parts",
    title: "Solder Fume Extractor Parts",
    year: "2026",
    categories: ["CAD & 3D Printing"],
    blurb: "Custom printed components designed for a bench solder fume extraction build.",
    thumb: "assets/img/solder-fume-extractor-parts/thumb.jpg",
    tags: ["CAD", "3D printing", "Workshop tooling"],
    url: "projects/solder-fume-extractor-parts.html",
    featured: false
  },

{
    id: "arduino-led-heart",
    title: "Arduino LED Heart",
    year: "2025",
    categories: ["Electronics & Embedded"],
    blurb: "An Arduino-driven LED display piece, built as a gift.",
    thumb: "assets/img/arduino-led-heart/thumb.jpg",
    tags: ["Arduino", "LED control", "Soldering"],
    url: "projects/arduino-led-heart.html",
    featured: false
  },

{
    id: "sheet-metal-toolbox",
    title: "Sheet Metal Toolbox",
    year: "2024",
    categories: ["Fabrication & Manufacturing"],
    blurb: "A toolbox made from flat sheet: layout, cutting, forming and joining.",
    thumb: "assets/img/sheet-metal-toolbox/thumb.jpg",
    tags: ["Sheet metal", "Layout", "Forming"],
    url: "projects/sheet-metal-toolbox.html",
    featured: false
  },

{
    id: "precision-fit-exercise",
    title: "Precision Fit Exercise",
    year: "2024",
    categories: ["Additional Manufacturing"],
    blurb: "Steel pieces cut and hand-finished until they interlock with a tight sliding fit.",
    thumb: "assets/img/precision-fit-exercise/thumb.jpg",
    tags: ["Hand finishing", "Filing", "Layout"],
    url: "projects/precision-fit-exercise.html",
    featured: false
  },

{
    id: "lathe-plumb-bob",
    title: "Lathe-Machined Plumb Bob",
    year: "2025",
    categories: ["Additional Manufacturing"],
    blurb: "A stepped plumb bob turned from steel on a metal lathe, working from a machining drawing.",
    thumb: "assets/img/lathe-plumb-bob/thumb.jpg",
    tags: ["Lathe", "Turning"],
    url: "projects/lathe-plumb-bob.html",
    featured: false
  },

{
    id: "welding-exercise",
    title: "Welding Exercise",
    year: "2025",
    categories: ["Additional Manufacturing"],
    blurb: "Welding practice pieces: fillet and corner joints, from tacking through to finished runs.",
    thumb: "assets/img/welding-exercise/thumb.jpg",
    tags: ["Welding"],
    url: "projects/welding-exercise.html",
    featured: false
  },

{
    id: "camping-cooktop",
    title: "Camping Cooktop",
    year: "2025",
    categories: ["Fabrication & Manufacturing"],
    blurb: "A folding camp cooktop welded from steel stock, built from my own dimensioned drawings.",
    thumb: "assets/img/camping-cooktop/thumb.jpg",
    tags: ["Welding", "Lathe", "Technical drawing"],
    url: "projects/camping-cooktop.html",
    featured: false
  }

];


/* --------------------------------------------------------------------------
   EXPERIMENTS AND WORKS IN PROGRESS
   Short items that are worth mentioning but do not warrant a full page.
   These appear as a plain list at the bottom of the projects page.
   Delete the whole list and the section will disappear on its own.
   -------------------------------------------------------------------------- */

window.EXPERIMENTS = [
  {
    title: "Breadboard synthesisers",
    note: "Small breadboard-level synth circuits built to understand oscillators and audio filtering. Exploratory rather than finished builds."
  }
  /* Add more like this:
  ,{
    title: "Short name",
    note: "One or two sentences."
  }
  */
];

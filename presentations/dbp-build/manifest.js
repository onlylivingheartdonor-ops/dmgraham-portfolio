/* ===================================================================
   MANIFEST.JS
   Single source of truth for slide order and per-slide configuration.

   - Slide IDs are fixed strings, zero-padded ("01", "02", ... "63").
   - The engine NEVER computes a slide's identity from its array position.
     It looks up "next" by walking this array, but a slide's own ID,
     file, and assets are always referenced directly by this ID string.
   - On insert/reorder: renumber affected slide IDs, filenames, and
     asset names together, then update this file. See process notes.

   Fields:
     id       - stable string ID, matches slide-XX.js and asset prefixes
     file     - path to the slide's JS module (exports template string)
     vo       - path to VO audio file, or null if this slide has no VO
     duration - ms to auto-advance after VO ends / slide enters, if
                no VO. null = wait for VO end, or wait for manual
                advance if special requires it.
     music    - { track, volume } only set on slides where music
                changes; omit/null to inherit current state
     special  - null, or a string the engine recognizes:
                  "continue-button"  - waits for user click before advancing
                  "manual-advance"   - no auto-advance at all (chaos slides etc.)
                  "stop-button"      - shows STOP control, pauses auto-advance
     transition - how this slide enters. "fade" (default, simple
                  opacity crossfade) or "push-up"/"push-down" (true
                  two-element push: outgoing slide animates fully
                  off-screen while incoming slide animates fully
                  in, simultaneously, matching v49's real push
                  transition). Omit for default fade.
   =================================================================== */

const MANIFEST = [
  {
    id: "01",
    file: "slides/slide-01.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "02",
    file: "slides/slide-02.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "03",
    file: "slides/slide-03.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio",
    transition: "push-up"
  },
  {
    id: "04",
    file: "slides/slide-04.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio",
    transition: "push-down"
  },
  {
    id: "05",
    file: "slides/slide-05.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "06",
    file: "slides/slide-06.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "07",
    file: "slides/slide-07.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "08",
    file: "slides/slide-08.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "09",
    file: "slides/slide-09.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "10",
    file: "slides/slide-10.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "11",
    file: "slides/slide-11.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "12",
    file: "slides/slide-12.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "13",
    file: "slides/slide-13.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "14",
    file: "slides/slide-14.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "15",
    file: "slides/slide-15.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "16",
    file: "slides/slide-16.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "17",
    file: "slides/slide-17.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "18",
    file: "slides/slide-18.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "19",
    file: "slides/slide-19.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "20",
    file: "slides/slide-20.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "21",
    file: "slides/slide-21.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "22",
    file: "slides/slide-22.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "23",
    file: "slides/slide-23.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "24",
    file: "slides/slide-24.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "25",
    file: "slides/slide-25.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "26",
    file: "slides/slide-26.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "27",
    file: "slides/slide-27.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "28",
    file: "slides/slide-28.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "29",
    file: "slides/slide-29.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "30",
    file: "slides/slide-30.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "31",
    file: "slides/slide-31.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "32",
    file: "slides/slide-32.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "33",
    file: "slides/slide-33.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "34",
    file: "slides/slide-34.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "35",
    file: "slides/slide-35.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "36",
    file: "slides/slide-36.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "37",
    file: "slides/slide-37.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "38",
    file: "slides/slide-38.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "39",
    file: "slides/slide-39.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "40",
    file: "slides/slide-40.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "41",
    file: "slides/slide-41.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "42",
    file: "slides/slide-42.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "43",
    file: "slides/slide-43.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "44",
    file: "slides/slide-44.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "45",
    file: "slides/slide-45.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "46",
    file: "slides/slide-46.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "47",
    file: "slides/slide-47.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "48",
    file: "slides/slide-48.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "49",
    file: "slides/slide-49.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "50",
    file: "slides/slide-50.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "51",
    file: "slides/slide-51.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "52",
    file: "slides/slide-52.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "53",
    file: "slides/slide-53.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "54",
    file: "slides/slide-54.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "55",
    file: "slides/slide-55.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "56",
    file: "slides/slide-56.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "57",
    file: "slides/slide-57.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "58",
    file: "slides/slide-58.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "59",
    file: "slides/slide-59.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "60",
    file: "slides/slide-60.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  },
  {
    id: "61",
    file: "slides/slide-61.js",
    vo: null,
    duration: null,
    music: null,
    special: "self-managed-audio"
  }
];

// Lookup map built once from the array above — used by the engine so
// "get slide by ID" is never an array-index operation.
const SLIDES_BY_ID = Object.fromEntries(MANIFEST.map(s => [s.id, s]));

function getSlide(id) {
  return SLIDES_BY_ID[id] || null;
}

function getNextId(currentId) {
  const idx = MANIFEST.findIndex(s => s.id === currentId);
  if (idx === -1 || idx === MANIFEST.length - 1) return null;
  return MANIFEST[idx + 1].id;
}

function getPrevId(currentId) {
  const idx = MANIFEST.findIndex(s => s.id === currentId);
  if (idx <= 0) return null;
  return MANIFEST[idx - 1].id;
}

function getFirstId() {
  return MANIFEST.length ? MANIFEST[0].id : null;
}

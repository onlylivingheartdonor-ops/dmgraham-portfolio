/* ===================================================================
   ENGINE-PRELOAD.JS
   Looks ahead in the manifest and preloads upcoming VO/music so
   playback doesn't stall waiting on a network/disk read.
   One job: preloading. Does not control playback or navigation.
   =================================================================== */

const PreloadEngine = (() => {
  const LOOKAHEAD = 2; // how many slides ahead to preload
  const preloaded = new Set();

  function preloadAudio(src) {
    if (!src || preloaded.has(src)) return;
    const a = new Audio();
    a.preload = "auto";
    a.src = src;
    preloaded.add(src);
  }

  function preloadFrom(currentId) {
    let id = currentId;
    for (let i = 0; i < LOOKAHEAD; i++) {
      id = getNextId(id);
      if (!id) break;
      const slide = getSlide(id);
      if (!slide) continue;
      if (slide.vo) preloadAudio(slide.vo);
      if (slide.music && slide.music.track) preloadAudio(slide.music.track);
    }
  }

  return { preloadFrom };
})();

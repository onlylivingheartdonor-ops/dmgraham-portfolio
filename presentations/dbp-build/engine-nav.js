/* ===================================================================
   ENGINE-NAV.JS
   Drives which slide is showing. Walks the manifest by ID lookup —
   never derives identity from array position/index arithmetic.
   One job: navigation state + advance/back/goto.
   =================================================================== */

const NavEngine = (() => {
  let currentId = null;
  let autoAdvanceTimer = null;
  let isPaused = false;
  let onSlideChange = null; // callback(slide) set by app shell

  let onDeckEnd = null; // callback set by app shell

  function init(changeCallback, deckEndCallback) {
    onSlideChange = changeCallback;
    onDeckEnd = deckEndCallback || null;
    currentId = getFirstId();
  }

  function clearAutoAdvance() {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
  }

  function goTo(id) {
    const slide = getSlide(id);
    if (!slide) {
      console.error("NavEngine: no slide found for id", id);
      return;
    }
    clearAutoAdvance();
    currentId = id;

    if (slide.music) {
      AudioEngine.setMusic(slide.music.track, slide.music.volume);
    }

    // Slides marked "self-managed-audio" own their own VO/advance timing
    // entirely inside onEnter (e.g. video playback, manual crossfades).
    // The engine must not also start/stop VO or schedule an advance for
    // them, or it will race against — or outright short-circuit — what
    // the slide's own code is doing.
    if (slide.special !== "self-managed-audio") {
      AudioEngine.playVO(slide.vo, () => handleVoEnded(slide));
    }

    if (onSlideChange) onSlideChange(slide);

    PreloadEngine.preloadFrom(currentId);

    // Slides with a fixed duration and no VO advance on a flat timer.
    if (slide.special !== "self-managed-audio" && !slide.vo && slide.duration && slide.special !== "manual-advance") {
      autoAdvanceTimer = setTimeout(() => advance(), slide.duration);
    }
  }

  function handleVoEnded(slide) {
    if (slide.special === "manual-advance") return;
    if (slide.special === "continue-button") return;
    if (slide.special === "stop-button") return;
    // VO ending triggers advance after a short pause — default 500ms,
    // overridable per slide via manifest's postVoDelay field.
    const delay = (typeof slide.postVoDelay === "number") ? slide.postVoDelay : 500;
    autoAdvanceTimer = setTimeout(() => advance(), delay);
  }

  function advance() {
    if (isPaused) return;
    const nextId = getNextId(currentId);
    if (!nextId) {
      console.log("NavEngine: reached end of deck.");
      if (onDeckEnd) onDeckEnd();
      return;
    }
    goTo(nextId);
  }

  function back() {
    const prevId = getPrevId(currentId);
    if (!prevId) return;
    goTo(prevId);
  }

  function pause() {
    isPaused = true;
    clearAutoAdvance();
    AudioEngine.pauseAll();
  }

  function resume() {
    isPaused = false;
    AudioEngine.resumeAll();
  }

  function getCurrentId() {
    return currentId;
  }

  return { init, goTo, advance, back, pause, resume, getCurrentId };
})();

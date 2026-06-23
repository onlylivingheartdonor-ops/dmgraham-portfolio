/* ===================================================================
   APP.JS
   The shell's wiring. Owns the stage container and the debug tool.
   Contains zero slide content — only knows how to render whatever
   slide module the manifest points it to.
   =================================================================== */

const SLIDE_MODULES = {
  "01": SLIDE_01,
  "02": SLIDE_02,
  "03": SLIDE_03,
  "04": SLIDE_04,
  "05": SLIDE_05,
  "06": SLIDE_06,
  "07": SLIDE_07,
  "08": SLIDE_08,
  "09": SLIDE_09,
  "10": SLIDE_10,
  "11": SLIDE_11,
  "12": SLIDE_12,
  "13": SLIDE_13,
  "14": SLIDE_14,
  "15": SLIDE_15,
  "16": SLIDE_16,
  "17": SLIDE_17,
  "18": SLIDE_18,
  "19": SLIDE_19,
  "20": SLIDE_20,
  "21": SLIDE_21,
  "22": SLIDE_22,
  "23": SLIDE_23,
  "24": SLIDE_24,
  "25": SLIDE_25,
  "26": SLIDE_26,
  "27": SLIDE_27,
  "28": SLIDE_28,
  "29": SLIDE_29,
  "30": SLIDE_30,
  "31": SLIDE_31,
  "32": SLIDE_32,
  "33": SLIDE_33,
  "34": SLIDE_34,
  "35": SLIDE_35,
  "36": SLIDE_36,
  "37": SLIDE_37,
  "38": SLIDE_38,
  "39": SLIDE_39,
  "40": SLIDE_40,
  "41": SLIDE_41,
  "42": SLIDE_42,
  "43": SLIDE_43,
  "44": SLIDE_44,
  "45": SLIDE_45,
  "46": SLIDE_46,
  "47": SLIDE_47,
  "48": SLIDE_48,
  "49": SLIDE_49,
  "50": SLIDE_50,
  "51": SLIDE_51,
  "52": SLIDE_52,
  "53": SLIDE_53,
  "54": SLIDE_54,
  "55": SLIDE_55,
  "56": SLIDE_56,
  "57": SLIDE_57,
  "58": SLIDE_58,
  "59": SLIDE_59,
  "60": SLIDE_60,
  "61": SLIDE_61
};

let activeSlideId = null;

function renderSlide(slide) {
  const stage = document.getElementById("stage");
  const outgoingEl = stage.querySelector('.slide');
  const outgoingId = activeSlideId;


  // Clean up the outgoing slide's JS (timers, video playback, etc.)
  // immediately — its DOM element may stick around briefly longer
  // for push transitions, but its behavior shouldn't.
  if (activeSlideId) {
    const outgoingMod = SLIDE_MODULES[activeSlideId];
    if (outgoingMod && typeof outgoingMod.onExit === "function") {
      outgoingMod.onExit();
    }
  }

  const mod = SLIDE_MODULES[slide.id];

  if (!mod) {
    stage.innerHTML = `<div class="slide-missing">No slide module registered for id "${slide.id}"</div>`;
    console.error("Missing SLIDE_MODULES entry for id:", slide.id);
    activeSlideId = null;
    return;
  }

  const transitionType = slide.transition || "fade";

  if ((transitionType === "push-up" || transitionType === "push-down") && outgoingEl) {
    // True two-element push: outgoing slide stays in the DOM and
    // animates fully off-screen while the incoming slide animates
    // fully in, at the same time — matching v49's real push
    // transition rather than a single-element approximation.
    const incomingEl = document.createElement('div');
    incomingEl.innerHTML = mod.html;
    const newSlideEl = incomingEl.firstElementChild;
    stage.appendChild(newSlideEl);
    activeSlideId = slide.id;

    const outClass = transitionType === "push-up" ? "push-out-up" : "push-out-down";
    const inClass = transitionType === "push-up" ? "push-in-up" : "push-in-down";

    outgoingEl.classList.add(outClass);
    newSlideEl.classList.add(inClass);

    void newSlideEl.offsetWidth; // force reflow before triggering

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        outgoingEl.classList.add('animate-out');
        newSlideEl.classList.add('show');
      });
    });

    // Remove the outgoing element once its animation completes
    // (matches the .8s transform transition in style.css).
    setTimeout(() => {
      if (outgoingEl.parentNode) outgoingEl.parentNode.removeChild(outgoingEl);
    }, 850);

    if (typeof mod.onEnter === "function") {
      mod.onEnter();
    }
    return;
  }

  // Default path: true two-element crossfade. Outgoing slide stays
  // in the DOM and fades out while the incoming slide fades in on
  // top of it, simultaneously — both visible together briefly, so
  // there's no black hold in between (unlike a single-element fade,
  // where the outgoing slide vanishes instantly before the incoming
  // one has faded up). Same proven pattern as the push transition
  // above, just animating opacity instead of position.
  const incomingEl = document.createElement('div');
  incomingEl.innerHTML = mod.html;
  const newSlideEl = incomingEl.firstElementChild;
  stage.appendChild(newSlideEl);
  activeSlideId = slide.id;

  if (outgoingEl) {
    outgoingEl.classList.add('crossfade-out');
  }
  // No extra class needed on newSlideEl for the fade-in itself —
  // the base .slide rule (opacity:0 → .show = opacity:1) already
  // handles it.

  void newSlideEl.offsetWidth; // force reflow before triggering

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (outgoingEl) outgoingEl.classList.add('animate-out');
      newSlideEl.classList.add('show');
    });
  });

  if (outgoingEl) {
    // Remove the outgoing element once its fade-out completes
    // (matches the .7s opacity transition in style.css).
    setTimeout(() => {
      if (outgoingEl.parentNode) outgoingEl.parentNode.removeChild(outgoingEl);
    }, 750);
  }

  if (typeof mod.onEnter === "function") {
    mod.onEnter();
  }
}

function onDeckEnd() {
  const stage = document.getElementById("stage");
  if (activeSlideId) {
    const outgoingMod = SLIDE_MODULES[activeSlideId];
    if (outgoingMod && typeof outgoingMod.onExit === "function") {
      outgoingMod.onExit();
    }
  }
  activeSlideId = null;
  stage.innerHTML = "";
  AudioEngine.pauseAll();
  // Return to the portfolio landing page. Path assumes this deck lives at
  // portfolio/presentations/dbp-build/ — two levels below the portfolio root.
  window.location.href = "../../index.html";
}

// --- Debug tool: spacebar pause/resume ---
let debugPaused = false;
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    debugPaused = !debugPaused;
    if (debugPaused) {
      NavEngine.pause();
      console.log("[debug] paused");
    } else {
      NavEngine.resume();
      console.log("[debug] resumed");
    }
  }
});

// --- Boot ---
window.addEventListener("DOMContentLoaded", () => {
  NavEngine.init(renderSlide, onDeckEnd);
  NavEngine.goTo(getFirstId());
});

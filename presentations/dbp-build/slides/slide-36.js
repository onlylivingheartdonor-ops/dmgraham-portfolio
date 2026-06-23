/* ===================================================================
   SLIDE-36.JS
   Transitions GIF plays as full-bleed background. VO plays
   immediately on entry; advance fires when VO ends (standard
   pattern, no manual interaction).

   VO source is v49's 38.mp3, per the off-by-one rule (v49's own
   data-vo="37" belongs to this slide directly, +1 for our merge
   offset) — NOT yet confirmed by ear, flag for Dave to verify.
   =================================================================== */

const SLIDE_36 = {
  html: `
    <div class="slide slide-36">
      <img class="bg-cover" src="assets/transitions.gif" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-36.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

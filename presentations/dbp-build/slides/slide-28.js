/* ===================================================================
   SLIDE-28.JS
   Full-bleed composed image (Dave's original slide art). VO source
   is v49's 29.mp3, per the confirmed off-by-one rule (our slide 1+2
   merge shifts every later VO number by one relative to v49's own
   data-vo attributes) — NOT yet confirmed by ear, flag for Dave to
   verify on first listen.

   VO plays immediately on entry. Standard 500ms post-VO delay
   before advance.
   =================================================================== */

const SLIDE_28 = {
  html: `
    <div class="slide slide-28">
      <img class="bg-cover" src="assets/bg-28-boredrightnow.png" alt="I don't know. Are you bored right now?">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-28.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

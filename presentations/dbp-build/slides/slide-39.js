/* ===================================================================
   SLIDE-39.JS
   "Thank You" — calm, normal-transition slide using the blue
   "TRANSITIONS" image as a static background (confirmed by Dave,
   matches v49's "reuses original tasteful transition #1
   background"). VO plays on entry; advance fires 1 second after VO
   ends, per Dave's spec.

   This is also the slide both chaos slides (37, 38) jump to directly
   via NavEngine.goTo('39') if the user clicks either STOP button.

   VO source is v49's 39.mp3, per the off-by-one rule (v49's own
   data-vo="39" belongs to this slide directly, +1 for our merge
   offset) — NOT yet confirmed by ear, flag for Dave to verify.
   =================================================================== */

const SLIDE_39 = {
  html: `
    <div class="slide slide-39">
      <img class="bg-cover" src="assets/bg-39-thankyou.png" alt="Thank You">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-38.mp3', () => {
      setTimeout(() => NavEngine.advance(), 2000);
    });
  },

  onExit: function () {}
};

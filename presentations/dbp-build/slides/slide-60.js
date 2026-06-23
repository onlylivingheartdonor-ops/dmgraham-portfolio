/* ===================================================================
   SLIDE-60.JS
   "Thank You" — handwritten pen-and-paper image, static composed
   image, no live HTML/CSS rebuild per Dave's rule for static slides.
   No animation.

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_60 = {
  html: `
    <div class="slide slide-60">
      <img class="bg-cover" src="assets/bg-60-thankyou.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-60.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

/* ===================================================================
   SLIDE-57.JS
   "A good presentation should have no more than 10 slides." — Guy
   Kawasaki quote, static composed image, no live HTML/CSS rebuild
   per Dave's rule for static slides. No animation.

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_57 = {
  html: `
    <div class="slide slide-57">
      <img class="bg-cover" src="assets/bg-57-tenslides.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-57.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

/* ===================================================================
   SLIDE-45.JS
   Full color wheel — static composed image, no live HTML/CSS rebuild
   per Dave's rule for static slides. Second of the gray->color wheel
   pair (44 gray, 45 full color), same exact image as 44 just in full
   color — the contrast does the work, no special transition needed.

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_45 = {
  html: `
    <div class="slide slide-45">
      <img class="bg-cover" src="assets/bg-45-fullwheel.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-45.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

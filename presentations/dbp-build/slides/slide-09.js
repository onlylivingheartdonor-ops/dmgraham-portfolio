/* ===================================================================
   SLIDE-09.JS
   Full-bleed composed image (Bueller classroom photo with chalkboard
   background and captions already baked in by Dave). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_09 = {
  html: `
    <div class="slide slide-09">
      <img class="bg-cover" src="assets/bg-09-bueller.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-09.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

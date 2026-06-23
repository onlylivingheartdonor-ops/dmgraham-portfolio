/* ===================================================================
   SLIDE-20.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_20 = {
  html: `
    <div class="slide slide-20">
      <img class="bg-cover" src="assets/bg-20-whatabout.png" alt="What About Bullet Points list">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-20.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

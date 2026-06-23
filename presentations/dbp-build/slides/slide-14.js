/* ===================================================================
   SLIDE-14.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_14 = {
  html: `
    <div class="slide slide-14">
      <img class="bg-cover" src="assets/bg-14-afghanistan.png" alt="Afghanistan Stability COIN Dynamics chart">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-14.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

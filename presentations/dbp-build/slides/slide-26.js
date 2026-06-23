/* ===================================================================
   SLIDE-26.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_26 = {
  html: `
    <div class="slide slide-26">
      <img class="bg-cover" src="assets/bg-26-yes2.png" alt="Yes.">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-26.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

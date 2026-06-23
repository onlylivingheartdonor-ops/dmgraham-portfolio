/* ===================================================================
   SLIDE-24.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_24 = {
  html: `
    <div class="slide slide-24">
      <img class="bg-cover" src="assets/bg-24-yes.png" alt="Yes.">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-24.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

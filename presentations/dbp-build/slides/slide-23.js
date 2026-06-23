/* ===================================================================
   SLIDE-23.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_23 = {
  html: `
    <div class="slide slide-23">
      <img class="bg-cover" src="assets/bg-23-sojustone.png" alt="So just ONE idea? Really?">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-23.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

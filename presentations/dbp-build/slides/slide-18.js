/* ===================================================================
   SLIDE-18.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_18 = {
  html: `
    <div class="slide slide-18">
      <img class="bg-cover" src="assets/bg-18-highlightbooks.png" alt="Highlighted books photo">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-18.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

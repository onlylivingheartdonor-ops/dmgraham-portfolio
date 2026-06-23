/* ===================================================================
   SLIDE-25.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_25 = {
  html: `
    <div class="slide slide-25">
      <img class="bg-cover" src="assets/bg-25-lots.png" alt="Then wont I have LOTS of slides?">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-25.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

/* ===================================================================
   SLIDE-22.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_22 = {
  html: `
    <div class="slide slide-22">
      <img class="bg-cover" src="assets/bg-22-lencioni.png" alt="If everything is important then nothing is - Patrick Lencioni">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-22.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

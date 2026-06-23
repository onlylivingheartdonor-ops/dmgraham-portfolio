/* ===================================================================
   SLIDE-15.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_15 = {
  html: `
    <div class="slide slide-15">
      <img class="bg-cover" src="assets/bg-15-oilcharts.png" alt="Oil and gas production charts">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-15.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

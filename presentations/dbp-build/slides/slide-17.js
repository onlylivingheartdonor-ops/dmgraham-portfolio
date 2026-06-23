/* ===================================================================
   SLIDE-17.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_17 = {
  html: `
    <div class="slide slide-17">
      <img class="bg-cover" src="assets/bg-17-iknow.png" alt="I know! We can highlight all the important stuff!">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-17.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

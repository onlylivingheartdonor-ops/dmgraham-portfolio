/* ===================================================================
   SLIDE-16.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_16 = {
  html: `
    <div class="slide slide-16">
      <img class="bg-cover" src="assets/bg-16-whosgonnaremember.png" alt="Whos going to remember all that?">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-16.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

/* ===================================================================
   SLIDE-27.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_27 = {
  html: `
    <div class="slide slide-27">
      <img class="bg-cover" src="assets/bg-27-bored.png" alt="But wont my audience get bored?">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-27.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

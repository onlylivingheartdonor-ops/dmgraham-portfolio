/* ===================================================================
   SLIDE-19.JS
   Full-bleed composed image (Dave's original slide art). VO plays
   immediately on entry. Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_19 = {
  html: `
    <div class="slide slide-19">
      <img class="bg-cover" src="assets/bg-19-superhero.png" alt="Theres always bullet points!">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO("assets/vo-19.mp3", () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

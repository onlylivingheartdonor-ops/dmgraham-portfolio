/* ===================================================================
   SLIDE-47.JS
   "This is hard to read." — red text on green, static composed
   image exactly as Dave provided it, no extra build/animation per
   his confirmation.

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_47 = {
  html: `
    <div class="slide slide-47">
      <img class="bg-cover" src="assets/bg-47-hardtoread.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-47.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

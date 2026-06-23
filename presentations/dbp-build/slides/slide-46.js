/* ===================================================================
   SLIDE-46.JS
   Super colorful website (the "Accept Jesus, Forever Forgiven"
   rainbow-gradient site screenshot) — static composed image, no live
   HTML/CSS rebuild per Dave's rule for static slides.

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_46 = {
  html: `
    <div class="slide slide-46">
      <img class="bg-cover" src="assets/bg-46-colorfulwebsite.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-46.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

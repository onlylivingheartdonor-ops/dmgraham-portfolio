/* ===================================================================
   SLIDE-50.JS
   Thanksgiving / Ephesians 5:4 quote over forest background — static
   composed image, no live HTML/CSS rebuild per Dave's rule for
   static slides.

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_50 = {
  html: `
    <div class="slide slide-50">
      <img class="bg-cover" src="assets/bg-50-thanksgiving.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-50.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

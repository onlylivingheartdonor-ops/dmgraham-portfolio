/* ===================================================================
   SLIDE-51.JS
   "No more than six words on a slide. Ever." — Seth Godin quote,
   static composed image, no live HTML/CSS rebuild per Dave's rule
   for static slides.

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_51 = {
  html: `
    <div class="slide slide-51">
      <img class="bg-cover" src="assets/bg-51-sixwords.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-51.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

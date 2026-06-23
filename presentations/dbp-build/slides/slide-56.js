/* ===================================================================
   SLIDE-56.JS
   Okapi (the "strange looking animal") — static composed image, no
   live HTML/CSS rebuild per Dave's rule for static slides. No
   animation.

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_56 = {
  html: `
    <div class="slide slide-56">
      <img class="bg-cover" src="assets/bg-56-okapi.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-56.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

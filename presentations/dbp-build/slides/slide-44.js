/* ===================================================================
   SLIDE-44.JS
   Gray color wheel — static composed image, no live HTML/CSS rebuild
   per Dave's rule for static slides. First of the gray->color wheel
   pair (44 gray, 45 full color), straight cut between them, no
   custom transition (Dave confirmed standard default crossfade is
   fine / even no-fade would be fine — not worth a one-off effect for
   this beat).

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_44 = {
  html: `
    <div class="slide slide-44">
      <img class="bg-cover" src="assets/bg-44-graywheel.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-44.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

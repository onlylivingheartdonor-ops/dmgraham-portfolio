/* ===================================================================
   SLIDE-55.JS
   Man with foot behind his head (Tony Robbins "stay committed but
   stay flexible" quote) — static composed image, no live HTML/CSS
   rebuild per Dave's rule for static slides. No animation.

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_55 = {
  html: `
    <div class="slide slide-55">
      <img class="bg-cover" src="assets/bg-55-footbehindhead.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-55.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

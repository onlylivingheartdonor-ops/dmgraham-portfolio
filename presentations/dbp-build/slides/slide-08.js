/* ===================================================================
   SLIDE-08.JS
   Full-bleed composed image (mother/baby photo with caption text
   already baked in by Dave). VO plays immediately on entry (generic
   data-vo system in v49, no delay). Standard 500ms post-VO delay
   before advance.
   =================================================================== */

const SLIDE_08 = {
  html: `
    <div class="slide slide-08">
      <img class="bg-cover" src="assets/bg-08-isobutylparaben.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-08.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

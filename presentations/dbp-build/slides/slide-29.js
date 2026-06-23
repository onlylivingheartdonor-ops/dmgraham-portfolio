/* ===================================================================
   SLIDE-29.JS
   "#4 Using Animation/Effects" title card. Live HTML, same
   template/values as slides 7/10/13 (navy badge + dark title bar
   across the top) — per Dave's rule that all "#N Title" cards get
   the live treatment rather than a flat image.

   VO source is v49's 30.mp3, per the confirmed off-by-one rule — NOT
   yet confirmed by ear, flag for Dave to verify on first listen.

   VO plays immediately on entry. Standard 500ms post-VO delay
   before advance.
   =================================================================== */

const SLIDE_29 = {
  html: `
    <div class="slide slide-29">
      <img class="bg-cover" src="assets/bg-29-usinganimation.png" alt="">
      <div class="s29-title-card">
        <div class="s29-badge">#4</div>
        <div class="s29-title">USING ANIMATION AND EFFECTS</div>
      </div>
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-29.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

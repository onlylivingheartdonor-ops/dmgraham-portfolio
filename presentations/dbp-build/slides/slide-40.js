/* ===================================================================
   SLIDE-40.JS
   "#5 Using Images and Colors" title card. Live HTML, same
   template/values as slides 7/10/13/29 (navy badge + dark title bar
   across the top). Background is the Banff mountain/lake reflection
   photo. Renumbered from 45 to 40 to close the gap left by v49's own
   jump from "Thank You" straight to its own "slide 45" — keeping our
   deck strictly sequential with no skipped numbers (now the default
   for any such gap, no need to ask).

   VO source is v49's 46.mp3, per the confirmed off-by-one rule — NOT
   yet confirmed by ear, flag for Dave to verify on first listen.

   VO plays immediately on entry. Standard 500ms post-VO delay
   before advance.
   =================================================================== */

const SLIDE_40 = {
  html: `
    <div class="slide slide-40">
      <img class="bg-cover" src="assets/bg-40-usingimagescolors.png" alt="">
      <div class="s40-title-card">
        <div class="s40-badge">#5</div>
        <div class="s40-title">USING IMAGES AND COLORS</div>
      </div>
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-40.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

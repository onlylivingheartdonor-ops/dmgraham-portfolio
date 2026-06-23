/* ===================================================================
   SLIDE-41.JS
   Full-bleed composed image (dense Wikipedia-style Niagara Falls
   article screenshot, deliberately overloaded with text — same
   "too much info" device as slides 14/15). Renumbered from 46 to 41
   to close the gap left by v49's own jump from "Thank You" straight
   to its own "slide 45".

   VO source is v49's 47.mp3, per the confirmed off-by-one rule — NOT
   yet confirmed by ear, flag for Dave to verify on first listen.

   VO plays immediately on entry. Standard 500ms post-VO delay
   before advance.
   =================================================================== */

const SLIDE_41 = {
  html: `
    <div class="slide slide-41">
      <img class="bg-cover" src="assets/bg-41-niagarafalls-wiki.png" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-41.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

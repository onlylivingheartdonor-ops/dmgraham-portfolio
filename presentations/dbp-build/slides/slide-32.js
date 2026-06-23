/* ===================================================================
   SLIDE-32.JS
   Full-bleed animated background (balance/rocks GIF — renamed from
   the misleading "eye_bg.gif" it arrived as; confirmed by Dave to be
   the correct, intended image despite the old filename).

   VO source is v49's 33.mp3, per the confirmed off-by-one rule (our
   slide 1+2 merge shifts every later VO number by one relative to
   v49's own data-vo attributes) — NOT yet confirmed by ear, flag for
   Dave to verify on first listen, same as slide 28.

   VO plays immediately on entry. Standard 500ms post-VO delay
   before advance.
   =================================================================== */

const SLIDE_32 = {
  html: `
    <div class="slide slide-32">
      <img class="bg-cover" src="assets/bg-32-balance.gif" alt="">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-32.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

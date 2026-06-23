/* ===================================================================
   SLIDE-48.JS
   "#6 Using Humor" title card. Live HTML, same template/values as
   slides 7/10/13/29/40 (navy badge + dark title bar across the top)
   — per Dave's rule that ALL "#N Title" cards get the live
   treatment, no exceptions for ones whose source content happens to
   come from a real (if oddly-numbered) v49 slide. Background is the
   cat/book photo Dave provided directly.

   VO confirmed directly by Dave.

   VO plays immediately on entry. Standard 500ms post-VO delay
   before advance.
   =================================================================== */

const SLIDE_48 = {
  html: `
    <div class="slide slide-48">
      <img class="bg-cover" src="assets/bg-48-usinghumor.png" alt="">
      <div class="s48-title-card">
        <div class="s48-badge">#6</div>
        <div class="s48-title">USING HUMOR</div>
      </div>
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-48.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

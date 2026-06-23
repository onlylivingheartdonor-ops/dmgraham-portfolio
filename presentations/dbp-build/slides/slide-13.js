/* ===================================================================
   SLIDE-13.JS
   "#3 One Idea" title card. Live HTML, same template/values as slide
   7 (navy badge + dark title bar across the top) — not a flat image,
   since this is a "#N Title" card per Dave's rule that all such
   slides get the live treatment. Background is a lightbulb photo
   (2000x1125, confirmed sufficient resolution for full-bleed use).

   VO plays immediately on entry (generic data-vo system in v49, no
   delay). Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_13 = {
  html: `
    <div class="slide slide-13">
      <img class="bg-cover" src="assets/bg-13-oneidea.png" alt="">
      <div class="s13-title-card">
        <div class="s13-badge">#3</div>
        <div class="s13-title">ONLY ONE IDEA ON A SLIDE</div>
      </div>
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-13.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

/* ===================================================================
   SLIDE-10.JS
   "#2 Meet Them Where They Are" title card. Rebuilt as live HTML
   (same template/values as slides 7/13) after the original flat PNG
   was found to crop/distort at non-1280x720 viewport sizes — this is
   a "#N Title" card per Dave's rule that all such slides get the
   live treatment instead of a flat image.

   VO plays immediately on entry. Standard 500ms post-VO delay
   before advance.
   =================================================================== */

const SLIDE_10 = {
  html: `
    <div class="slide slide-10">
      <img class="bg-cover" src="assets/bg-10-meetthem.png" alt="">
      <div class="s10-title-card">
        <div class="s10-badge">#2</div>
        <div class="s10-title">MEET THEM WHERE THEY ARE</div>
      </div>
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-10.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

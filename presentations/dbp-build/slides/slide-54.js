/* ===================================================================
   SLIDE-54.JS
   Airplane meme (fair-use/educational) — full PNG as background
   (left black caption side + right movie-still side baked in
   together). A live #040404 rectangle (sampled from the image's own
   black) covers the right 62% of the slide on entry, masking the
   photo, then fades out at 5s to reveal it.

   VO plays from entry; auto-advances at VO end (no extra post-VO
   delay specified for this slide — advances directly on completion).
   =================================================================== */

const SLIDE_54 = {
  html: `
    <div class="slide slide-54">
      <img class="bg-cover" src="assets/bg-54-airplane.png" alt="">
      <div class="s54-reveal-rect"></div>
    </div>
  `,

  onEnter: function () {
    const rect = document.querySelector('.slide-54 .s54-reveal-rect');

    const revealTimer = setTimeout(() => {
      rect.classList.add('hide');
    }, 5000);

    AudioEngine.playVO('assets/vo-54.mp3', () => {
      NavEngine.advance();
    });

    this._cleanup = () => clearTimeout(revealTimer);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

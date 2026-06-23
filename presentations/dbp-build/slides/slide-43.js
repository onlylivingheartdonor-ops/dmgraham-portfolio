/* ===================================================================
   SLIDE-43.JS
   "SHOW." / "DON'T TELL." — two huge text lines over a dimmed
   background, stamping in together at 4s with a fast scale-punch
   (not a fade — near-instant opacity, quick scale snap), exact
   timing/values from v49. VO plays from entry; standard 500ms
   post-VO delay before advance.
   =================================================================== */

const SLIDE_43 = {
  html: `
    <div class="slide slide-43">
      <img class="s43-bg" src="assets/bg-43-showdonttell.png" alt="">
      <div class="s43-text">
        <div class="s43-line-1">SHOW.</div>
        <div class="s43-line-2">DON'T TELL.</div>
      </div>
    </div>
  `,

  onEnter: function () {
    const l1 = document.querySelector('.slide-43 .s43-line-1');
    const l2 = document.querySelector('.slide-43 .s43-line-2');

    const stampTimer = setTimeout(() => {
      l1.classList.add('show');
      l2.classList.add('show');
    }, 4000);

    AudioEngine.playVO('assets/vo-43.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });

    this._cleanup = () => clearTimeout(stampTimer);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

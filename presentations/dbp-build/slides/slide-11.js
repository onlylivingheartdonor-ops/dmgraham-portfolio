/* ===================================================================
   SLIDE-11.JS
   Background image with a start/stop button overlay that fades in
   14 seconds into the VO (confirmed real value from v49, VO is
   22.6s long). VO plays from entry; standard 500ms post-VO delay
   before advance.
   =================================================================== */

const SLIDE_11 = {
  html: `
    <div class="slide slide-11">
      <img class="bg-cover" src="assets/bg-11-startstop.png" alt="">
      <div class="s11-overlay">
        <img src="assets/img-11-startstop-overlay.png" alt="Start Stop buttons">
      </div>
    </div>
  `,

  onEnter: function () {
    const overlay = document.querySelector('.slide-11 .s11-overlay');

    AudioEngine.playVO('assets/vo-11.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });

    const overlayTimer = setTimeout(() => {
      overlay.classList.add('show');
    }, 14000);

    this._cleanup = () => clearTimeout(overlayTimer);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

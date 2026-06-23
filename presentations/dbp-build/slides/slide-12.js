/* ===================================================================
   SLIDE-12.JS
   Three bowl images stacked, each fading in over the last: bowl 1
   visible immediately, bowl 2 at 3s, bowl 3 at 6s (confirmed real
   values from v49). VO plays from entry; standard 500ms post-VO
   delay before advance.
   =================================================================== */

const SLIDE_12 = {
  html: `
    <div class="slide slide-12">
      <img class="s12-bowl s12-bowl-1" src="assets/img-12-bowl-1.png" alt="">
      <img class="s12-bowl s12-bowl-2" src="assets/img-12-bowl-2.png" alt="">
      <img class="s12-bowl s12-bowl-3" src="assets/img-12-bowl-3.png" alt="">
    </div>
  `,

  onEnter: function () {
    const bowl2 = document.querySelector('.slide-12 .s12-bowl-2');
    const bowl3 = document.querySelector('.slide-12 .s12-bowl-3');

    AudioEngine.playVO('assets/vo-12.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });

    const timers = [
      setTimeout(() => bowl2.classList.add('show'), 3000),
      setTimeout(() => bowl3.classList.add('show'), 6000)
    ];

    this._cleanup = () => timers.forEach(clearTimeout);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

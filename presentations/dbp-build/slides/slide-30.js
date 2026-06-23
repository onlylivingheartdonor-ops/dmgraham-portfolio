/* ===================================================================
   SLIDE-30.JS
   Film strip image fades in at left (0.2s), then a red "NO" circle
   (circle + diagonal slash) crashes down from above the frame to
   rest over it at 1.2s — exact timing/positions from v49, converted
   to vh/vw/vmin (vmin used for the ring specifically, since it must
   stay a true circle regardless of viewport aspect ratio).

   VO source is v49's 31.mp3, per the confirmed off-by-one rule — NOT
   yet confirmed by ear, flag for Dave to verify on first listen.
   =================================================================== */

const SLIDE_30 = {
  html: `
    <div class="slide slide-30">
      <img class="bg-cover s30-anim-bg" src="assets/bg-30-31-anim.png" alt="">
      <img class="s30-film-left" src="assets/img-30-31-filmstrip.png" alt="">
      <div class="s30-no-ring"></div>
    </div>
  `,

  onEnter: function () {
    const film = document.querySelector('.slide-30 .s30-film-left');
    const ring = document.querySelector('.slide-30 .s30-no-ring');

    const filmTimer = setTimeout(() => {
      film.classList.add('show');
    }, 200);

    const ringTimer = setTimeout(() => {
      ring.classList.add('crash');
    }, 1200);

    AudioEngine.playVO('assets/vo-30.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });

    this._cleanup = () => {
      clearTimeout(filmTimer);
      clearTimeout(ringTimer);
    };
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

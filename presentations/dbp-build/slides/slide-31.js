/* ===================================================================
   SLIDE-31.JS
   Same film strip + crashed NO ring persist (static, no re-animation)
   from slide 30. A vertical divider draws down the center (0.3s),
   then film-strip images pile up one by one on the right half,
   building visual clutter.

   Pile positions use grid-jittered randomization instead of v49's 80
   hardcoded coordinates: the right half is divided into a loose grid,
   each cell gets one image placed at a randomized offset within it
   (plus some edge-bleed), with random rotation per image — same
   "scattered clutter" visual character as the original, without
   carrying 80 literal numbers. All positions stay within the right
   half per Dave's requirement.

   VO source is v49's 32.mp3, per the confirmed off-by-one rule — NOT
   yet confirmed by ear, flag for Dave to verify on first listen.
   =================================================================== */

const SLIDE_31 = {
  html: `
    <div class="slide slide-31">
      <img class="bg-cover s30-anim-bg" src="assets/bg-30-31-anim.png" alt="">
      <img class="s31-film-anchor" src="assets/img-30-31-filmstrip.png" alt="">
      <div class="s31-no-ring"></div>
      <div class="s31-divider"></div>
      <div class="s31-pile"></div>
    </div>
  `,

  onEnter: function () {
    const divider = document.querySelector('.slide-31 .s31-divider');
    const pile = document.querySelector('.slide-31 .s31-pile');

    const timers = [];

    timers.push(setTimeout(() => {
      divider.classList.add('show');
    }, 300));

    // Grid-jittered random positions: right half divided into a
    // loose grid (8 cols x 10 rows = 80 cells, matching the original
    // image count), each cell gets one image at a random offset
    // within it, so coverage stays even but placement still looks
    // organically scattered rather than gridded.
    const COLS = 8;
    const ROWS = 10;
    const cellWidthPct = 100 / COLS;   // relative to the pile container (right half)
    const cellHeightPct = 100 / ROWS;
    const positions = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const jitterX = (Math.random() - 0.5) * cellWidthPct * 0.8;
        const jitterY = (Math.random() - 0.5) * cellHeightPct * 0.8;
        const leftPct = col * cellWidthPct + cellWidthPct / 2 + jitterX;
        const topPct = row * cellHeightPct + cellHeightPct / 2 + jitterY;
        positions.push({ left: leftPct, top: topPct });
      }
    }

    // Shuffle so the pile-on order isn't a strict grid sweep.
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    function randRot() {
      return Math.round(Math.random() * 140 - 70) + 'deg';
    }

    positions.forEach((pos, i) => {
      const t = setTimeout(() => {
        const img = document.createElement('img');
        img.src = 'assets/img-30-31-filmstrip.png';
        img.className = 's31-pile-img';
        img.style.left = pos.left + '%';
        img.style.top = pos.top + '%';
        img.style.transform = `translate(-50%, -50%) rotate(${randRot()})`;
        pile.appendChild(img);
        void img.offsetWidth;
        img.classList.add('show');
      }, (i + 1) * 100 + 300);
      timers.push(t);
    });

    AudioEngine.playVO('assets/vo-31.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });

    this._cleanup = () => timers.forEach(clearTimeout);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

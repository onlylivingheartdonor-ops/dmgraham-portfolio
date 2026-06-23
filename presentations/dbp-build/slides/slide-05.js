/* ===================================================================
   SLIDE-05.JS
   Three lines fade/slide in in sequence, sad face follows, all timed
   evenly against the VO's real duration (10.08s, confirmed via
   ffprobe). Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_05 = {
  html: `
    <div class="slide slide-05">
      <img class="bg-cover" src="assets/bg-05-cantdo.jpg" alt="">
      <div class="cantdo-lines">
        <div class="cline cline-1">I don't have<br>the time.</div>
        <div class="cline cline-2">It's too hard.</div>
        <div class="cline cline-3">I can't do it.</div>
        <div class="sadwrap">
          <img class="sadface" src="assets/img-05-sadface.png" alt="">
        </div>
      </div>
    </div>
  `,

  onEnter: function () {
    const line1 = document.querySelector('.slide-05 .cline-1');
    const line2 = document.querySelector('.slide-05 .cline-2');
    const line3 = document.querySelector('.slide-05 .cline-3');
    const sad = document.querySelector('.slide-05 .sadwrap');

    // Timing matches v49: lines evenly spaced across the VO's real
    // 5500ms-equivalent window (confirmed VO duration ~10.08s; v49's
    // spacing constants are reproduced exactly here).
    const LINE1 = 500;
    const LINE2 = 500 + Math.round(5500 / 3);       // ~2333ms
    const LINE3 = 500 + Math.round((5500 * 2) / 3);  // ~4167ms
    const SAD = LINE3 + 500;                          // ~4667ms

    const timers = [
      setTimeout(() => line1.classList.add('show'), LINE1),
      setTimeout(() => line2.classList.add('show'), LINE2),
      setTimeout(() => line3.classList.add('show'), LINE3),
      setTimeout(() => sad.classList.add('show'), SAD)
    ];

    AudioEngine.playVO('assets/vo-05.mp3', () => {
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

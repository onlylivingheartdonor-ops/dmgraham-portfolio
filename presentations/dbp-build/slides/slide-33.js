/* ===================================================================
   SLIDE-33.JS
   "Movement attracts the eye" bar flies in from the right at 0.1s.
   At 11s, a dark overlay covers the slide and a purple panel
   ("if you feel you MUST use bullet points...") fades in on the
   left. Three bullets then appear one at a time at 19.5s, 23.5s,
   29.5s — each new bullet appears, previous bullets dim (not
   disappear). All timing exact from v49, confirmed by Dave as
   matching all the animations on the VO.

   VO is v49's 34.mp3 directly (34s, not offset-shifted — confirmed
   by Dave this is the correct file, contains all the slide's
   animation cues). Advance fires 1s after VO ends (not the usual
   500ms — matches v49's specific timing for this slide).
   =================================================================== */

const SLIDE_33 = {
  html: `
    <div class="slide slide-33">
      <img class="bg-cover" src="assets/img-33-eyebg.png" alt="">
      <div class="s33-eye-bar">
        <div class="s33-eye-bar-text">MOVEMENT ATTRACTS THE EYE</div>
      </div>
      <div class="s33-dark-overlay"></div>
      <div class="s33-panel">
        <p>For instance, if you feel that you <u>MUST</u> use bullet points to organize your information:</p>
      </div>
      <div class="s33-bullets">
        <div class="s33-bullet" data-step="1">It's always smart to keep them short.</div>
        <div class="s33-bullet" data-step="2">They should animate a single point at a time.</div>
        <div class="s33-bullet" data-step="3">They should dim afterward.</div>
      </div>
    </div>
  `,

  onEnter: function () {
    const slideEl = document.querySelector('.slide-33');
    const bar = slideEl.querySelector('.s33-eye-bar');
    const overlay = slideEl.querySelector('.s33-dark-overlay');
    const panel = slideEl.querySelector('.s33-panel');

    function applyBulletState(step) {
      slideEl.querySelectorAll('.s33-bullet').forEach((b) => {
        const s = parseInt(b.dataset.step, 10);
        b.classList.toggle('visible', s <= step);
        b.classList.toggle('dimmed', s < step);
      });
    }

    const timers = [];

    timers.push(setTimeout(() => bar.classList.add('show'), 100));

    timers.push(setTimeout(() => {
      overlay.classList.add('show');
      panel.classList.add('show');
    }, 11000));

    timers.push(setTimeout(() => applyBulletState(1), 19500));
    timers.push(setTimeout(() => applyBulletState(2), 23500));
    timers.push(setTimeout(() => applyBulletState(3), 29500));

    AudioEngine.playVO('assets/vo-33.mp3', () => {
      setTimeout(() => NavEngine.advance(), 1000);
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

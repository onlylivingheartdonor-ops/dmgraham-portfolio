/* ===================================================================
   SLIDE-37.JS
   Chaos visual: six distinct rapid-fire transition effects
   (checkerboard, blinds, spin-zoom, strobe, random-slide, bounce)
   cycling through 4 colored images via the shared ChaosEngine —
   genuinely "fireworks," not a flat image swap. Runs for 6 seconds,
   then the first STOP button + STOP VO appear.

   - Click STOP -> jump immediately to slide 39 (Thank You)
   - No click -> 4 seconds after the button appears, auto-advance
     to slide 38
   =================================================================== */

const SLIDE_37 = {
  html: `
    <div class="slide slide-37">
      <div class="s37-chaos-canvas"></div>
      <button class="s37-stop-btn">&#9632; STOP</button>
    </div>
  `,

  onEnter: function () {
    const canvas = document.querySelector('.slide-37 .s37-chaos-canvas');
    const stopBtn = document.querySelector('.slide-37 .s37-stop-btn');

    const images = [
      'assets/img-chaos-1-blue.png',
      'assets/img-chaos-2-green.png',
      'assets/img-chaos-3-tan.png',
      'assets/img-chaos-4-maroon.png'
    ];

    const stopChaos = ChaosEngine.start(canvas, images);

    let advanced = false;
    function goToThankYou() {
      if (advanced) return;
      advanced = true;
      stopChaos();
      clearTimeout(autoAdvanceTimer);
      NavEngine.goTo('39');
    }

    const stopRevealTimer = setTimeout(() => {
      stopBtn.classList.add('show');
      AudioEngine.playVO('assets/vo-stop1.mp3', () => {});
    }, 6000);

    let autoAdvanceTimer = setTimeout(() => {
      if (advanced) return;
      advanced = true;
      stopChaos();
      NavEngine.advance();
    }, 10000); // 6s chaos + 4s after STOP button appears

    stopBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToThankYou();
    });

    this._cleanup = () => {
      stopChaos();
      clearTimeout(stopRevealTimer);
      clearTimeout(autoAdvanceTimer);
    };
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

/* ===================================================================
   SLIDE-38.JS
   Same chaos engine as slide 37 (six rapid-fire transition effects),
   but the second STOP button + STOP VO appear immediately on entry
   (no delay), per Dave's spec.

   - Click STOP -> jump immediately to slide 39 (Thank You)
   - No click -> 6 seconds after entry, auto-advance to slide 39
   =================================================================== */

const SLIDE_38 = {
  html: `
    <div class="slide slide-38">
      <div class="s37-chaos-canvas"></div>
      <button class="s37-stop-btn show">&#9632; STOP</button>
    </div>
  `,

  onEnter: function () {
    const canvas = document.querySelector('.slide-38 .s37-chaos-canvas');
    const stopBtn = document.querySelector('.slide-38 .s37-stop-btn');

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

    // Explicitly force the button visible/interactive on entry,
    // rather than relying solely on the "show" class already being
    // present in the HTML string — guards against any timing where
    // the class could be stripped or not yet applied when the slide
    // first paints.
    requestAnimationFrame(() => {
      stopBtn.classList.add('show');
    });

    AudioEngine.playVO('assets/vo-stop2.mp3', () => {});

    const autoAdvanceTimer = setTimeout(() => {
      if (advanced) return;
      advanced = true;
      stopChaos();
      NavEngine.advance();
    }, 6000);

    stopBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToThankYou();
    });

    this._cleanup = () => {
      stopChaos();
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

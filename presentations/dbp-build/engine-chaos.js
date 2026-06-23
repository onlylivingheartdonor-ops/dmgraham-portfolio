/* ===================================================================
   ENGINE-CHAOS.JS
   Shared "fireworks" chaos-cycling engine for slides 37/38. Six
   genuinely distinct transition techniques (not just an image swap)
   fire in rapid, randomized rotation against the chaos canvas —
   technique adapted from a confirmed-good earlier version of this
   deck, reworked to fit our slide-module pattern.

   Each effect function takes (el, imageUrl, onDone) and calls onDone
   when its own animation finishes, so the loop can immediately queue
   the next effect — no fixed external interval driving it, each
   effect's own duration paces the next call.
   =================================================================== */

const ChaosEngine = (() => {
  const EFFECTS = [
    // Checkerboard: grid of cells reveal in random order
    function checkerboard(el, img, cb) {
      el.style.background = `url(${img}) center/cover`;
      const grid = 8;
      const cells = [];
      for (let r = 0; r < grid; r++) {
        for (let c = 0; c < grid; c++) {
          const d = document.createElement('div');
          d.style.cssText = `position:absolute;left:${c * 100 / grid}%;top:${r * 100 / grid}%;width:${100 / grid}%;height:${100 / grid}%;background:inherit;opacity:0;`;
          el.appendChild(d);
          cells.push(d);
        }
      }
      cells.sort(() => Math.random() - 0.5).forEach((d, i) => {
        setTimeout(() => { d.style.opacity = '1'; }, i * 2);
      });
      setTimeout(() => { el.innerHTML = ''; cb(); }, cells.length * 2 + 50);
    },

    // Blinds: horizontal strips reveal top to bottom
    function blinds(el, img, cb) {
      const strips = 12;
      for (let i = 0; i < strips; i++) {
        const d = document.createElement('div');
        d.style.cssText = `position:absolute;left:0;top:${i * 100 / strips}%;width:100%;height:${100 / strips}%;background:url(${img}) center/cover;transform:scaleY(0);transform-origin:top;transition:transform 60ms ease ${i * 8}ms;`;
        el.appendChild(d);
        void d.offsetWidth;
        d.style.transform = 'scaleY(1)';
      }
      setTimeout(() => { el.innerHTML = ''; cb(); }, strips * 8 + 80);
    },

    // Spin zoom: image spins in from nothing
    function spinZoom(el, img, cb) {
      el.style.background = `url(${img}) center/cover`;
      el.style.transform = 'rotate(720deg) scale(0)';
      el.style.transition = 'transform 90ms cubic-bezier(.2,1.4,.4,1)';
      void el.offsetWidth;
      el.style.transform = 'rotate(0deg) scale(1)';
      setTimeout(() => { el.style.transform = ''; el.style.transition = ''; cb(); }, 100);
    },

    // Flash strobe: rapid opacity flicker
    function strobe(el, img, cb) {
      el.style.background = `url(${img}) center/cover`;
      let count = 0;
      const id = setInterval(() => {
        el.style.opacity = count % 2 ? '1' : '0';
        count++;
        if (count > 6) {
          clearInterval(id);
          el.style.opacity = '1';
          cb();
        }
      }, 12);
    },

    // Slide in from a random direction
    function randomSlide(el, img, cb) {
      const dirs = [
        ['translateX(100%)', 'translateX(0)'],
        ['translateX(-100%)', 'translateX(0)'],
        ['translateY(100%)', 'translateY(0)'],
        ['translateY(-100%)', 'translateY(0)']
      ];
      const [from, to] = dirs[Math.floor(Math.random() * dirs.length)];
      el.style.background = `url(${img}) center/cover`;
      el.style.transform = from;
      el.style.transition = 'none';
      void el.offsetWidth;
      el.style.transition = 'transform 80ms cubic-bezier(.4,0,.2,1)';
      el.style.transform = to;
      setTimeout(() => { el.style.transform = ''; el.style.transition = ''; cb(); }, 90);
    },

    // Bounce scale: overshoots in from large, settles to normal
    function bounceIn(el, img, cb) {
      el.style.background = `url(${img}) center/cover`;
      el.style.transform = 'scale(2)';
      el.style.opacity = '0';
      el.style.transition = 'none';
      void el.offsetWidth;
      el.style.transition = 'transform 90ms cubic-bezier(.2,1.8,.4,1), opacity 60ms ease';
      el.style.transform = 'scale(1)';
      el.style.opacity = '1';
      setTimeout(() => {
        el.style.transform = '';
        el.style.transition = '';
        el.style.opacity = '';
        cb();
      }, 100);
    }
  ];

  /**
   * Starts the chaos loop on the given canvas element, cycling
   * through the provided images with a randomized effect each time.
   * Returns a stop function to halt the loop cleanly.
   */
  function start(canvas, images) {
    let running = true;
    let imgIdx = 0;
    canvas.style.background = `url(${images[0]}) center/cover`;

    function runNext() {
      if (!running) return;
      imgIdx = (imgIdx + 1) % images.length;
      const effect = EFFECTS[Math.floor(Math.random() * EFFECTS.length)];
      canvas.style.cssText = 'position:absolute;inset:0;';
      effect(canvas, images[imgIdx], () => {
        if (running) runNext();
      });
    }

    runNext();

    return function stop() {
      running = false;
    };
  }

  return { start };
})();

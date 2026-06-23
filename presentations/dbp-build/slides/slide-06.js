/* ===================================================================
   SLIDE-06.JS
   Title card: crime-tape background, red band, "7" graphic, gold
   headline, "relatively" hand-written accent text that types itself
   in character-by-character (staggered animation-delay per letter,
   matching v49's mechanism), caret symbol. VO plays once on entry,
   then HOLDS — no auto-advance. User must click Continue.

   This is a "continue-button" special slide: no VO-end advance, no
   duration timer. Manual interaction only, per Dave's two confirmed
   manual-interaction points in the deck (this slide's Continue
   button, and the chaos slides' STOP button).
   =================================================================== */

const SLIDE_06 = {
  html: `
    <div class="slide slide-06">
      <img class="bg-cover" src="assets/bg-06-crimetape.jpg" alt="">
      <div class="s06-overlay"></div>
      <div class="s06-band"></div>
      <img class="s06-seven" src="assets/img-06-seven.png" alt="7">
      <div class="s06-headline">EASY WAYS TO AVOID<br>DEATH BY POWERPOINT</div>
      <div class="s06-relatively-wrap">
        <div class="s06-relatively" id="s06-relatively">relatively</div>
      </div>
      <div class="s06-caret" id="s06-caret">^</div>
      <button class="s06-continue-btn" id="s06-continue-btn">CONTINUE &#9658;</button>
    </div>
  `,

  onEnter: function () {
    const caret = document.getElementById('s06-caret');
    const rel = document.getElementById('s06-relatively');
    const continueBtn = document.getElementById('s06-continue-btn');

    // Wrap each character of "relatively" in its own span with a
    // staggered animation-delay, so it types itself in letter by
    // letter — matches v49's exact mechanism.
    const text = rel.textContent;
    rel.innerHTML = '';
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 's06-ch';
      span.textContent = ch;
      span.style.animationDelay = (i * 0.1) + 's';
      rel.appendChild(span);
    });

    const entryTimer = setTimeout(() => {
      // Caret appears first, then the typing text 350ms later.
      void caret.offsetWidth;
      caret.classList.add('show');
      setTimeout(() => rel.classList.add('show'), 350);

      // VO plays once, then holds — no auto-advance. The Continue
      // button is the only way forward on this slide.
      AudioEngine.playVO('assets/vo-06.mp3', () => {
        /* hold — intentionally no advance() call here */
      });
    }, 250);

    continueBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      NavEngine.advance();
    });

    this._cleanup = () => clearTimeout(entryTimer);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

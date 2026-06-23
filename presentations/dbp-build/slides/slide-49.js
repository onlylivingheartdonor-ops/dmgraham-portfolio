/* ===================================================================
   SLIDE-49.JS
   "Mary's PowerPoint" — a single paragraph in a left-side text panel
   over a full-brightness background image (no dimming, unlike slide
   43's background), fading up at 400ms. VO plays from entry;
   standard 500ms post-VO delay before advance.

   Renumbered 45 -> 49 (and "Using Humor" 44 -> 48) to make room for
   the four new slides inserted ahead of them per Dave's authoritative
   slide list: gray color wheel (44), full color wheel (45), colorful
   website (46), hard-to-read red/green (47).

   VO source is v49's literal vo-54 (54.mp3, NOT offset-shifted) —
   both the direct and offset-shifted candidates had plausible
   durations (11.9s vs 11.2s), so this is flagged for extra-careful
   by-ear confirmation, same caution that caught the slide 42/43 VO
   mix-up earlier.
   =================================================================== */

const SLIDE_49 = {
  html: `
    <div class="slide slide-49">
      <img class="s49-bg" src="assets/bg-49-marysppt.png" alt="">
      <div class="s49-text">
        <p class="s49-para">Before she was thirty, Mary's PowerPoint slides had killed more people than the Boston Strangler.</p>
      </div>
    </div>
  `,

  onEnter: function () {
    const para = document.querySelector('.slide-49 .s49-para');

    para.classList.remove('show');
    void para.offsetWidth;
    const stampTimer = setTimeout(() => {
      para.classList.add('show');
    }, 400);

    AudioEngine.playVO('assets/vo-49.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });

    this._cleanup = () => clearTimeout(stampTimer);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

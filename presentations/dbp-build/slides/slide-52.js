/* ===================================================================
   SLIDE-52.JS
   "#19 Do The Unexpected" — REPLACES the earlier minimal placeholder.
   Live title card (same template as 7/10/13/29/40/48 — navy badge +
   dark title bar) over a plain black background, with a true mid-
   sentence interrupt gag:

   - vo-52a plays from entry. The narrator is questioning the "#19"
     numbering ("Do The Unexpected" is logically #7, not #19 — see
     Dave's note on the "7 Easy Ways" slide for why it's actually 19).
   - At 5.6s (chosen deliberately mid-word/mid-thought inside the
     narrator's last continuous speech run, NOT at a pause — Dave
     wants a genuine interruption, not a clean handoff), vo-52a is
     forcibly killed via AudioEngine.stopVO(). This is a real cut,
     not a natural file end — vo-52a is NOT trimmed.
   - In that same instant: the monkey image pops up FAST (~90ms rise
     with a small overshoot/settle, fast enough to startle, just
     barely slow enough to read as a peek rather than a flash-cut)
     and vo-52b starts playing (the startled "WHOA!" reaction).
   - vo-52b plays to its natural end, standard 500ms post-VO delay,
     then advance.

   Monkey image (img-52-monkey.png) is a transparent PNG cutout,
   hidden (translateY off bottom + opacity 0) until the interrupt
   moment.
   =================================================================== */

const SLIDE_52 = {
  html: `
    <div class="slide slide-52">
      <div class="s52-title-card">
        <div class="s52-badge">#19</div>
        <div class="s52-title">DO THE UNEXPECTED</div>
      </div>
      <img class="s52-monkey" src="assets/img-52-monkey.png" alt="">
    </div>
  `,

  onEnter: function () {
    const root = document.querySelector('.slide-52');
    const monkey = root.querySelector('.s52-monkey');

    AudioEngine.playVO('assets/vo-52a.mp3', () => {
      // vo-52a's natural onEnd is never reached in normal playback —
      // it's always killed early by the interrupt timer below. This
      // callback is just a safety net in case something prevents the
      // interrupt from firing (e.g. autoplay block), so the deck
      // doesn't strand on this slide.
    });

    const interruptTimer = setTimeout(() => {
      AudioEngine.stopVO();
      monkey.classList.add('show');
      setTimeout(() => monkey.classList.add('settle'), 90);

      AudioEngine.playVO('assets/vo-52b.mp3', () => {
        setTimeout(() => NavEngine.advance(), 500);
      });
    }, 5600);

    this._cleanup = () => clearTimeout(interruptTimer);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

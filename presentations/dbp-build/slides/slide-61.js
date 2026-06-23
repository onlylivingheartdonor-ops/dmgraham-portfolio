/* ===================================================================
   SLIDE-61.JS
   Final contact slide (David M. Graham) — static composed image
   background per Dave's rule for static slides; only the closing
   music/button behavior is live.

   Sequence:
     0s         — slide visible, vo-61 plays (~2s), music-closing.mp3
                  still at its ducked 0.34 level from slide 59
     VO ends    — music swells from 0.34 to full volume (1.0) over
                  2s; "End Presentation" button fades in at the same
                  moment
     Exit (either of two paths, whichever comes first):
       (a) Dave clicks the button
       (b) music-closing.mp3 finishes playing on its own (it was set
           to non-looping back on slide 59's crossfadeMusic call, so
           it genuinely reaches 'ended' — tracked here via
           AudioEngine.onMusicEnded, not a separate shadow timer)
     Either path triggers the same close: AudioEngine.fadeOutAll over
     2s (fades both VO if any and music to silence), the slide's own
     visual content fades to black over the same 2s, then
     NavEngine.advance() — which finds no next slide and lets the
     engine's existing "reached end of deck" path fire naturally.
   Email and phone number are clickable hotspots (mailto:/tel: links)
   positioned over their text in the baked-in background image —
   invisible overlays, approximate position based on the image's
   visual layout, may need fine-tuning once Dave checks them against
   the actual rendered slide.

   "Take the Quiz!" button links to the standalone quiz page (lives
   in its own separate dbp-quiz/ folder, NOT part of this deck's
   manifest/slide system). Path is currently a relative guess
   ("../dbp-quiz/index.html") assuming the quiz folder sits alongside
   this deck's folder once hosted — Dave will need to update this
   href to match wherever he actually places the quiz on his site.
   Same-tab navigation (no target="_blank") per Dave's instruction,
   since there's no path back into the deck from the quiz by design.

   =================================================================== */

const SLIDE_61 = {
  html: `
    <div class="slide slide-61">
      <img class="bg-cover" src="assets/bg-61-contact.png" alt="">
      <a class="s61-hotspot s61-hotspot-email" href="mailto:onlylivingheartdonor@gmail.com" aria-label="Email David"></a>
      <a class="s61-hotspot s61-hotspot-phone" href="tel:+13233959985" aria-label="Call David"></a>
      <button class="s61-end-btn" type="button">End Presentation</button>
      <a class="s61-quiz-btn" href="../dbp-quiz/index.html">Take the Quiz!</a>
      <div class="s61-fadeout"></div>
    </div>
  `,

  onEnter: function () {
    const root = document.querySelector('.slide-61');
    const btn = root.querySelector('.s61-end-btn');
    const quizBtn = root.querySelector('.s61-quiz-btn');
    const fadeOverlay = root.querySelector('.s61-fadeout');
    let closed = false;

    const doClose = () => {
      if (closed) return;
      closed = true;

      btn.classList.remove('show');
      quizBtn.classList.remove('show');
      fadeOverlay.classList.add('show');

      AudioEngine.fadeOutAll(2000, () => {
        NavEngine.advance();
      });
    };

    AudioEngine.playVO('assets/vo-61.mp3', () => {
      AudioEngine.fadeMusicTo(1.0, 2000);
      btn.classList.add('show');
      quizBtn.classList.add('show');
      AudioEngine.onMusicEnded(doClose);
    });

    btn.addEventListener('click', doClose);
    this._btnClickHandler = doClose;
    this._btn = btn;

    this._cleanup = () => {
      if (this._btn && this._btnClickHandler) {
        this._btn.removeEventListener('click', this._btnClickHandler);
      }
    };
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

/* ===================================================================
   SLIDE-59.JS
   "That's THE END" — background is a cropped (16:9) version of
   Dave's clean mic/circles artwork (no baked-in text). "That's THE
   END" is built live on top, recreating Dave's reference composition
   (which had text baked in at a different aspect ratio/crop) as
   closely as possible rather than using the baked version directly.

   FONT EXCEPTION: "That's" uses 'Georgia', serif, bold — a
   deliberate one-off style choice to echo the slab-serif look of
   Dave's reference art. This is NOT a drift from the deck-wide
   Helvetica/Arial rule; it's a conscious exception for this single
   element, confirmed with Dave. "THE END" still follows the normal
   Helvetica/Arial standard.

   Text fades/floats in during the VO (short, ~3s clip) rather than
   being static from entry, since this is the closing "punch" slide.

   Music: Blood Money (started on slide 2, running continuously since)
   crossfades here into music-closing.mp3 over 2s. The closing track
   is louder at the source (-21.5 LUFS vs Blood Money's -27.9 LUFS,
   ~6.4dB hotter) so it crossfades in at 0.34 (not 0.7) to land at
   the same perceived loudness Blood Money has had throughout the
   deck. It stays at this level until slide 61, where it swells to
   full volume once that slide's VO ends.

   Looping is OFF for this track (4th crossfadeMusic arg) — it needs
   to play through once and naturally end on slide 61, which listens
   for that via AudioEngine.onMusicEnded as one of its two close
   triggers (the other being the End Presentation button).

   VO plays from entry; standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_59 = {
  html: `
    <div class="slide slide-59">
      <img class="bg-cover" src="assets/bg-59-thatstheend.png" alt="">
      <div class="s59-thats">That's</div>
      <div class="s59-theend">
        <div class="s59-the">THE</div>
        <div class="s59-end">END</div>
      </div>
    </div>
  `,

  onEnter: function () {
    const root = document.querySelector('.slide-59');
    const thats = root.querySelector('.s59-thats');
    const theend = root.querySelector('.s59-theend');

    AudioEngine.crossfadeMusic('assets/music-closing.mp3', 0.34, 2000, false);

    const t1 = setTimeout(() => thats.classList.add('show'), 200);
    const t2 = setTimeout(() => theend.classList.add('show'), 700);

    AudioEngine.playVO('assets/vo-59.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });

    this._cleanup = () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

/* ===================================================================
   SLIDE-58.JS
   "7 (relatively) Easy Ways to Avoid Death by PowerPoint" title card,
   then dark overlay + numbered list reveal — one slide, two stages.

   Stage 1: vo-58a plays over the title card.
   Stage 2: once vo-58a ends, the dark overlay fades in and the list
   reveals one item at a time, each driven by its OWN VO file
   (vo-58b-1.mp3 through vo-58b-7.mp3 — one file per bullet, per
   Dave's standing one-file-per-job preference, chosen specifically
   here because items have uneven lengths and individual files mean
   re-recording one bullet later doesn't require re-doing all seven).
   Each item floats in exactly when its file starts playing, and the
   next file/item only starts once the previous file's audio has
   actually finished — so timing is driven by real audio completion,
   not estimated/flat intervals.

   Item 7 in the chain is "19. Do The Unexpected" — not a typo, see
   Dave's note on this slide's earlier version for why it's 19 and
   not 7.

   Sequence:
     0s    — title card visible, vo-58a plays
     vo-58a ends — dark overlay fades in
     overlay shown — vo-58b-1 plays, item 1 floats in
     vo-58b-1 ends — vo-58b-2 plays, item 2 floats in
     ...repeats through vo-58b-7 / item 7...
     vo-58b-7 ends — standard 500ms post-VO delay, then advance
   =================================================================== */

const SLIDE_58 = {
  html: `
    <div class="slide slide-58">
      <img class="bg-cover" src="assets/bg-58-sevenways-title.png" alt="">
      <div class="s58-overlay">
        <div class="s58-list">
          <div class="s58-item"><span class="s58-num">1.</span> Know Your Audience</div>
          <div class="s58-item"><span class="s58-num">2.</span> Meet Them Where They Are</div>
          <div class="s58-item"><span class="s58-num">3.</span> One Idea on a Slide</div>
          <div class="s58-item"><span class="s58-num">4.</span> Use Animation and Effects (Wisely)</div>
          <div class="s58-item"><span class="s58-num">5.</span> Use Images and Colors</div>
          <div class="s58-item"><span class="s58-num">6.</span> Use Humor</div>
          <div class="s58-item"><span class="s58-num">19.</span> Do The Unexpected</div>
        </div>
      </div>
    </div>
  `,

  onEnter: function () {
    const root = document.querySelector('.slide-58');
    const overlay = root.querySelector('.s58-overlay');
    const items = root.querySelectorAll('.s58-item');

    const playItem = (index) => {
      if (index >= items.length) {
        setTimeout(() => NavEngine.advance(), 500);
        return;
      }
      items[index].classList.add('show');
      AudioEngine.playVO(`assets/vo-58b-${index + 1}.mp3`, () => {
        playItem(index + 1);
      });
    };

    AudioEngine.playVO('assets/vo-58a.mp3', () => {
      overlay.classList.add('show');
      playItem(0);
    });
  },

  onExit: function () {}
};

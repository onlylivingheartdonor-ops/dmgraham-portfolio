/* ===================================================================
   SLIDE-53.JS
   "Predictability Equals Security... BUT it can also equal death."
   Originally two candidate slides (pink vs. black) — Dave confirmed
   by listening to the VO that this is ONE slide with a timed
   sequence, not two separate slides. Collapses what was previously
   going to be 53/54 into a single slide 53; nothing occupies 54.

   Timeline (confirmed with Dave):
     0s      — pink background, title visible, VO starts
     6s      — "BUT" starburst grows in (invisible -> full size, NOT
                large-to-small; scale-punch with overshoot)
     6s-8.5s — background crossfades pink -> black (2.5s)
     10.5s   — (2s after the black transition completes) skull +
                "IT CAN ALSO EQUAL DEATH" grow in, same invisible ->
                full-size language as the BUT burst, just quieter/
                slower to match the grimmer tone
     VO ends — standard 500ms post-VO delay before advance

   Title text and "BUT"/death line are live HTML/SVG layers over a
   plain background-color div (not baked into a flat image) so each
   piece can be independently timed. but_starburst.svg and skull.svg
   are pre-existing shared assets, reused here.
   =================================================================== */

const SLIDE_53 = {
  html: `
    <div class="slide slide-53">
      <div class="s53-bg"></div>
      <div class="s53-title">PREDICTABILITY EQUALS SECURITY</div>
      <img class="s53-but" src="assets/but_starburst.svg" alt="">
      <div class="s53-death-row">
        <div class="s53-death-text">IT CAN ALSO EQUAL DEATH</div>
        <img class="s53-skull" src="assets/skull.svg" alt="">
      </div>
    </div>
  `,

  onEnter: function () {
    const root = document.querySelector('.slide-53');
    const bg = root.querySelector('.s53-bg');
    const but = root.querySelector('.s53-but');
    const deathRow = root.querySelector('.s53-death-row');

    const butTimer = setTimeout(() => {
      but.classList.add('show');
    }, 6000);

    const bgTimer = setTimeout(() => {
      bg.classList.add('black');
    }, 6000);

    const deathTimer = setTimeout(() => {
      deathRow.classList.add('show');
    }, 10500);

    AudioEngine.playVO('assets/vo-53.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });

    this._cleanup = () => {
      clearTimeout(butTimer);
      clearTimeout(bgTimer);
      clearTimeout(deathTimer);
    };
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

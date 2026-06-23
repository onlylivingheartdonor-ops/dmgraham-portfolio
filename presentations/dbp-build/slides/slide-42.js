/* ===================================================================
   SLIDE-42.JS
   Niagara Falls photo with three callouts revealing on a timed
   sequence (exact timing/positions from v49, confirmed by Dave as
   working exactly as intended): callout 1 (water volume) at 1s,
   callout 2 (border) at 2s, callout 3 (height) + SVG ruler together
   at 3s. VO plays from entry; standard 500ms post-VO delay before
   advance.
   =================================================================== */

const SLIDE_42 = {
  html: `
    <div class="slide slide-42">
      <img class="bg-cover" src="assets/bg-42-niagarafalls-photo.png" alt="">

      <div class="s42-callout s42-callout-1">
        <div class="s42-callout-box">85,000 cubic feet of water flows over the falls every second.</div>
      </div>

      <div class="s42-callout s42-callout-2">
        <div class="s42-callout-box">Border of New York (US) and Ontario (CA).</div>
      </div>

      <div class="s42-ruler-wrap">
        <svg class="s42-ruler-svg" viewBox="0 -12 50 358" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="0" x2="30" y2="334" stroke="#cc0000" stroke-width="2"/>
          <line x1="20" y1="0" x2="40" y2="0" stroke="#cc0000" stroke-width="2"/>
          <line x1="20" y1="334" x2="40" y2="334" stroke="#cc0000" stroke-width="2"/>

          <line x1="22" y1="0" x2="30" y2="0" stroke="#cc0000" stroke-width="1.5"/>
          <text x="18" y="4" fill="#000" font-size="11" font-family="Arial" font-weight="bold" text-anchor="end">167</text>

          <line x1="22" y1="50" x2="30" y2="50" stroke="#cc0000" stroke-width="1.5"/>
          <text x="18" y="54" fill="#000" font-size="11" font-family="Arial" font-weight="bold" text-anchor="end">150</text>

          <line x1="22" y1="100" x2="30" y2="100" stroke="#cc0000" stroke-width="1.5"/>
          <text x="18" y="104" fill="#000" font-size="11" font-family="Arial" font-weight="bold" text-anchor="end">125</text>

          <line x1="22" y1="150" x2="30" y2="150" stroke="#cc0000" stroke-width="1.5"/>
          <text x="18" y="154" fill="#000" font-size="11" font-family="Arial" font-weight="bold" text-anchor="end">100</text>

          <line x1="22" y1="200" x2="30" y2="200" stroke="#cc0000" stroke-width="1.5"/>
          <text x="18" y="204" fill="#000" font-size="11" font-family="Arial" font-weight="bold" text-anchor="end">75</text>

          <line x1="22" y1="250" x2="30" y2="250" stroke="#cc0000" stroke-width="1.5"/>
          <text x="18" y="254" fill="#000" font-size="11" font-family="Arial" font-weight="bold" text-anchor="end">50</text>

          <line x1="22" y1="300" x2="30" y2="300" stroke="#cc0000" stroke-width="1.5"/>
          <text x="18" y="304" fill="#000" font-size="11" font-family="Arial" font-weight="bold" text-anchor="end">25</text>

          <line x1="22" y1="334" x2="30" y2="334" stroke="#cc0000" stroke-width="1.5"/>
          <text x="18" y="338" fill="#000" font-size="11" font-family="Arial" font-weight="bold" text-anchor="end">0</text>

          <text x="38" y="170" fill="#cc0000" font-size="10" font-family="Arial" writing-mode="tb">ft.</text>
        </svg>
      </div>

      <div class="s42-callout s42-callout-3">
        <div class="s42-callout-box">A total height of 167 ft. (51 m)</div>
      </div>
    </div>
  `,

  onEnter: function () {
    const c1 = document.querySelector('.slide-42 .s42-callout-1');
    const c2 = document.querySelector('.slide-42 .s42-callout-2');
    const c3 = document.querySelector('.slide-42 .s42-callout-3');
    const ruler = document.querySelector('.slide-42 .s42-ruler-wrap');

    const timers = [
      setTimeout(() => c1.classList.add('show'), 1000),
      setTimeout(() => c2.classList.add('show'), 2000),
      setTimeout(() => {
        c3.classList.add('show');
        ruler.classList.add('show');
      }, 3000)
    ];

    AudioEngine.playVO('assets/vo-42.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });

    this._cleanup = () => timers.forEach(clearTimeout);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

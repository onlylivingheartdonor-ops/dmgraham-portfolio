/* ===================================================================
   SLIDE-02.JS
   Background carries forward from slide 1 (same police image, no
   re-fade — already on screen).

   Cartoon/panel layout values (position, sizing, panel styling, text
   treatment) are pulled directly from the v49 build, confirmed by
   Dave as correct: cartoon at left:28px width:596px, panel at
   right:16px with a light translucent background and dark bold text,
   panel height matched to the cartoon's rendered height via JS.

   Second line fades in where the VO's actual speech resumes after
   its internal pause (confirmed via silence detection on vo-02.mp3:
   speech 0–1123ms, silence 1123–3026ms, speech 3026–4807ms).
   Standard 500ms post-VO delay before advance.

   Background music starts immediately on entry with a quick fade-in,
   and is left running — it is NOT stopped in onExit, since it
   continues under the rest of the deck by design.

   Cartoon fires immediately alongside music (slow 1.5s fade, see
   style.css). Text panel, line 1, and VO start together 3.5s after
   entry, so the panel's arrival reads as a distinct second beat tied
   to narration starting, separate from the cartoon/music beat.
   Line 2's timing is relative to VO start, so it's offset by the
   same 3.5s.
   =================================================================== */

const SLIDE_02 = {
  html: `
    <div class="slide slide-02">
      <img class="bg-cover police-bg" src="assets/bg-01-police.jpg" alt="">
      <div class="cartoon-wrap">
        <img class="cartoon-img" src="assets/img-02-cartoon.png" alt="">
      </div>
      <div class="crime-panel">
        <div class="crime-line crime-line-1">You've experienced it.</div>
        <div class="crime-line crime-line-2">Maybe you've even caused it.</div>
      </div>
    </div>
  `,

  onEnter: function () {
    const cartoonWrap = document.querySelector('.slide-02 .cartoon-wrap');
    const cartoonImg = document.querySelector('.slide-02 .cartoon-img');
    const panel = document.querySelector('.slide-02 .crime-panel');
    const line1 = document.querySelector('.slide-02 .crime-line-1');
    const line2 = document.querySelector('.slide-02 .crime-line-2');

    const ENTRY_DELAY = 3500;

    // Panel height matches the cartoon's actual rendered height, so
    // the two visually line up regardless of the cartoon's aspect
    // ratio. Runs once the image's natural size is known. This is
    // independent of the fade-in timing below — width/layout are
    // set immediately even while opacity is still 0.
    function sizePanel() {
      if (cartoonImg.naturalWidth && cartoonImg.naturalHeight) {
        const renderedHeight = cartoonWrap.offsetWidth *
          (cartoonImg.naturalHeight / cartoonImg.naturalWidth);
        panel.style.height = renderedHeight + 'px';
      }
    }
    if (cartoonImg.complete) {
      sizePanel();
    } else {
      cartoonImg.addEventListener('load', sizePanel);
    }

    // Music fires first. Cartoon gets a brief 200ms head-start delay
    // before its own fade — audio has real playback latency (buffer/
    // decode) that a CSS opacity transition doesn't, so firing both
    // "at the same instant" in code still has music perceptibly
    // lagging the visual. This closes that gap.
    AudioEngine.setMusic('assets/music-bg.mp3', 0.7, 800);
    const cartoonTimer = setTimeout(() => {
      cartoonWrap.classList.add('show');
    }, 200);

    // Panel, line 1, and VO start together 3.5s after entry —
    // second beat, tied to narration starting.
    const entryTimer = setTimeout(() => {
      panel.classList.add('show');
      line1.classList.add('show');

      AudioEngine.playVO('assets/vo-02.mp3', () => {
        setTimeout(() => NavEngine.advance(), 500);
      });
    }, ENTRY_DELAY);

    // Line 2 fades in where the VO's speech actually resumes after
    // its internal pause (3026ms from VO start), offset by the same
    // entry delay since VO itself now starts later.
    const line2Timer = setTimeout(() => {
      line2.classList.add('show');
    }, ENTRY_DELAY + 3026);

    this._cleanup = () => {
      clearTimeout(cartoonTimer);
      clearTimeout(entryTimer);
      clearTimeout(line2Timer);
    };
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
    // Music is intentionally left running — do not stop it here.
  }
};

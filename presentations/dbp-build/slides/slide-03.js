/* ===================================================================
   SLIDE-03.JS
   Full-bleed background image (Dave's original composited slide art —
   not rebuilt as live HTML, since it's a complete self-contained
   design with no need for separately editable text).

   1s delay, then VO plays, then standard 500ms pause, then advance.
   =================================================================== */

const SLIDE_03 = {
  html: `
    <div class="slide slide-03">
      <img class="bg-cover" src="assets/bg-03-avoid.png" alt="Q: How do we avoid it?">
    </div>
  `,

  onEnter: function () {
    const entryTimer = setTimeout(() => {
      AudioEngine.playVO('assets/vo-03.mp3', () => {
        setTimeout(() => NavEngine.advance(), 500);
      });
    }, 1000);

    this._cleanup = () => clearTimeout(entryTimer);
  },

  onExit: function () {
    if (this._cleanup) {
      this._cleanup();
      this._cleanup = null;
    }
  }
};

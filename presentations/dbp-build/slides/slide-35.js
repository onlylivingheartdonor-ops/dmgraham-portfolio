/* ===================================================================
   SLIDE-35.JS
   Full-bleed composed image (Dave's original slide art). Renumbered
   from 36 to 35 to close the gap left by v49's own 33->35 jump,
   keeping our deck strictly sequential with no skipped numbers.

   VO confirmed correct by Dave directly (36.mp3 as originally
   uploaded, now renamed vo-35.mp3). VO plays immediately on entry.
   Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_35 = {
  html: `
    <div class="slide slide-35">
      <img class="bg-cover" src="assets/bg-35-clicktoadd.png" alt="Click to add really long title">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-35.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

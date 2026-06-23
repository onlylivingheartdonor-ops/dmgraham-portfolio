/* ===================================================================
   SLIDE-34.JS
   Full-bleed composed image (Dave's original slide art). Renumbered
   from 35 to 34 to close the gap left by v49's own 33->35 jump,
   keeping our deck strictly sequential with no skipped numbers.

   VO confirmed correct by Dave directly (35.mp3 as originally
   uploaded, now renamed vo-34.mp3). VO plays immediately on entry.
   Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_34 = {
  html: `
    <div class="slide slide-34">
      <img class="bg-cover" src="assets/bg-34-whatnottodo.png" alt="What not to do!">
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-34.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

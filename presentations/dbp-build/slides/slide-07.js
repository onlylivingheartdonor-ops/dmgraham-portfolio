/* ===================================================================
   SLIDE-07.JS
   Background image, badge ("#1") + title card ("KNOW YOUR AUDIENCE").
   VO plays immediately on entry (no delay — this slide used v49's
   generic data-vo system with no data-voDelay set, unlike slides
   3/4/5 which had an explicit 1s delay). Standard 500ms post-VO
   delay before advance.
   =================================================================== */

const SLIDE_07 = {
  html: `
    <div class="slide slide-07">
      <img class="bg-cover" src="assets/bg-07-audience.png" alt="">
      <div class="s07-title-card">
        <div class="s07-badge">#1</div>
        <div class="s07-title">KNOW YOUR AUDIENCE</div>
      </div>
    </div>
  `,

  onEnter: function () {
    AudioEngine.playVO('assets/vo-07.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

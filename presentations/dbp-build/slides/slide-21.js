/* ===================================================================
   SLIDE-21.JS
   "Emphasizing Everything = Nothing" — two white circles with an
   equals symbol between them, each fading up in sequence (exact
   timing/markup from v49, confirmed working): left circle shape
   (0s) -> left circle text (0.5s) -> equals symbol (1s) -> right
   circle shape (1.5s) -> right circle text (2s), each a 0.5s
   fade-up animation.

   VO plays on entry (confirmed by Dave as the correct "two circles"
   audio). Standard 500ms post-VO delay before advance.
   =================================================================== */

const SLIDE_21 = {
  html: `
    <div class="slide slide-21">
      <div class="s21-pair">
        <div class="s21-circle-wrap">
          <div class="s21-circle-shape"></div>
          <div class="s21-circle-text"><span class="s21-small">EMPHASIZING</span><span class="s21-big">EVERYTHING</span></div>
        </div>
        <div class="s21-equals"><span></span><span></span></div>
        <div class="s21-circle-wrap">
          <div class="s21-circle-shape"></div>
          <div class="s21-circle-text"><span class="s21-small">EMPHASIZING</span><span class="s21-big">NOTHING</span></div>
        </div>
      </div>
    </div>
  `,

  onEnter: function () {
    const slideEl = document.querySelector('.slide-21');
    requestAnimationFrame(() => slideEl.classList.add('s21-show'));

    AudioEngine.playVO('assets/vo-21.mp3', () => {
      setTimeout(() => NavEngine.advance(), 500);
    });
  },

  onExit: function () {}
};

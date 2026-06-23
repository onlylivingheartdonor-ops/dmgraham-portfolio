/* ===================================================================
   SLIDE-01.JS
   Cold open: intro video with title fades, then becomes the police
   image once the video ends, with audio carrying through continuously.
   One self-contained slide, no navigation handoff mid-sequence.

   Sequence:
   - Click to play (browsers block autoplay-with-sound otherwise)
   - Video plays; "Intelligent Heart Productions" / "presents" fade
     in and back out over it
   - 0.5s before video ends: police VO fades in while video audio
     fades out, same 500ms window
   - Video ends: video element hides, police image shows (CSS swap,
     not a slide change) — VO keeps playing underneath, uninterrupted
   - VO ends: advance() to whatever's next in the manifest
   =================================================================== */

const SLIDE_01 = {
  html: `
    <div class="slide slide-01">
      <video class="intro-video" src="assets/intro.mp4" playsinline preload="auto"></video>
      <img class="bg-cover police-bg" src="assets/bg-01-police.jpg" alt="">
      <div class="play-overlay">
        <div class="play-btn">&#9658;</div>
      </div>
      <div class="ihp-overlay">
        <div class="ihp-line1">Intelligent Heart Productions</div>
        <div class="ihp-line2">presents</div>
      </div>
    </div>
  `,

  onEnter: function () {
    const video = document.querySelector('.slide-01 .intro-video');
    const policeBg = document.querySelector('.slide-01 .police-bg');
    const playOverlay = document.querySelector('.slide-01 .play-overlay');
    const line1 = document.querySelector('.slide-01 .ihp-line1');
    const line2 = document.querySelector('.slide-01 .ihp-line2');

    let titleTimers = [];
    let crossfadeStarted = false;

    function startTitles() {
      titleTimers.forEach(clearTimeout);
      titleTimers = [];
      line1.style.opacity = '0';
      line2.style.opacity = '0';

      titleTimers.push(setTimeout(() => {
        line1.style.transition = 'opacity .8s ease';
        line1.style.opacity = '1';
      }, 1000));

      titleTimers.push(setTimeout(() => {
        line2.style.transition = 'opacity .8s ease';
        line2.style.opacity = '1';
      }, 2500));

      titleTimers.push(setTimeout(() => {
        line1.style.transition = 'opacity .6s ease';
        line2.style.transition = 'opacity .6s ease';
        line1.style.opacity = '0';
        line2.style.opacity = '0';
      }, 5600));
    }

    function onTimeUpdate() {
      if (crossfadeStarted) return;
      if (video.duration && video.currentTime >= video.duration - 0.5) {
        crossfadeStarted = true;
        video.removeEventListener('timeupdate', onTimeUpdate);

        // Police VO fades in while video audio fades out, same window.
        // This slide claims its own end callback — no handoff to
        // anything else, since this is the only slide involved.
        // 500ms pause after VO ends before advancing, matching the
        // engine's default post-VO delay for consistency.
        AudioEngine.fadeInVO('assets/vo-01.mp3', 500, () => {
          setTimeout(() => NavEngine.advance(), 500);
        });

        const fadeSteps = 10;
        let step = 0;
        const fadeInterval = setInterval(() => {
          step++;
          video.volume = Math.max(0, 1 - step / fadeSteps);
          if (step >= fadeSteps) clearInterval(fadeInterval);
        }, 50);
      }
    }

    playOverlay.addEventListener('click', (e) => {
      e.stopPropagation();
      playOverlay.classList.add('hidden');
      video.currentTime = 0;
      video.volume = 1;
      video.play().then(() => startTitles()).catch(() => {
        playOverlay.classList.remove('hidden');
      });
    });

    video.addEventListener('timeupdate', onTimeUpdate);

    // Video ending swaps the visual to the police image — a plain
    // CSS/DOM change within this same slide, not a navigation event.
    // The VO (already playing via fadeInVO above) continues
    // uninterrupted through this swap.
    video.addEventListener('ended', () => {
      video.style.display = 'none';
      policeBg.classList.add('show');
    });
  },

  onExit: function () {
    const video = document.querySelector('.slide-01 .intro-video');
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.volume = 1;
    }
  }
};

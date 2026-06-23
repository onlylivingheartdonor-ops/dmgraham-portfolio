/* ===================================================================
   ENGINE-AUDIO.JS
   Handles VO playback and background music. One job: audio.
   Does not know about navigation, DOM structure, or slide content.
   =================================================================== */

const AudioEngine = (() => {
  let voPlayer = new Audio();
  let musicPlayer = new Audio();
  let currentMusicTrack = null;
  let onVoEndCallback = null;

  musicPlayer.loop = true;

  function playVO(src, onEnd) {
    // Stop any prior VO cleanly before starting the next.
    voPlayer.pause();
    voPlayer.onended = null;

    if (!src) {
      // No VO on this slide — fire the callback immediately so the
      // engine's advance logic isn't left waiting forever.
      if (onEnd) onEnd();
      return;
    }

    voPlayer = new Audio(src);
    onVoEndCallback = onEnd;
    voPlayer.onended = () => {
      if (onVoEndCallback) onVoEndCallback();
    };
    voPlayer.play().catch(err => {
      console.error("VO playback failed:", src, err);
      // Don't strand the deck if a browser blocks autoplay — surface it
      // but still allow the callback so navigation isn't permanently stuck.
      if (onVoEndCallback) onVoEndCallback();
    });
  }

  function pauseVO() {
    voPlayer.pause();
  }

  function resumeVO() {
    voPlayer.play().catch(err => console.error("VO resume failed:", err));
  }

  function stopVO() {
    voPlayer.pause();
    voPlayer.currentTime = 0;
    voPlayer.onended = null;
  }

  /**
   * Starts a VO at volume 0 and ramps it up over `durationMs`, intended
   * for cross-slide audio handoffs (e.g. a video's own audio fading out
   * while the next slide's VO fades in, ahead of the slide transition
   * itself). This VO becomes the "current" VO — its onEnd callback fires
   * normally when it finishes, same as playVO().
   *
   * Returns the Audio element so the caller (e.g. a video element) can
   * synchronize its own fade-out against the same step count if desired.
   */
  function fadeInVO(src, durationMs, onEnd) {
    voPlayer.pause();
    voPlayer.onended = null;

    voPlayer = new Audio(src);
    voPlayer.volume = 0;
    onVoEndCallback = onEnd;
    voPlayer.onended = () => {
      if (onVoEndCallback) onVoEndCallback();
    };

    voPlayer.play().catch(err => {
      console.error("fadeInVO playback failed:", src, err);
      if (onVoEndCallback) onVoEndCallback();
    });

    const steps = 10;
    const stepMs = durationMs / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      voPlayer.volume = Math.min(1, step / steps);
      if (step >= steps) clearInterval(interval);
    }, stepMs);

    return voPlayer;
  }

  function setMusic(track, volume = 0.4, fadeMs = 0) {
    if (!track) return;
    if (currentMusicTrack === track) {
      // Same track already playing — just adjust volume if it changed.
      musicPlayer.volume = volume;
      return;
    }
    musicPlayer.pause();
    musicPlayer = new Audio(track);
    musicPlayer.loop = true;
    currentMusicTrack = track;

    if (fadeMs > 0) {
      musicPlayer.volume = 0;
      musicPlayer.play().catch(err => console.error("Music playback failed:", track, err));
      const steps = 10;
      const stepMs = fadeMs / steps;
      let step = 0;
      const player = musicPlayer; // capture reference for the closure
      const interval = setInterval(() => {
        step++;
        player.volume = Math.min(volume, (volume * step) / steps);
        if (step >= steps) clearInterval(interval);
      }, stepMs);
    } else {
      musicPlayer.volume = volume;
      musicPlayer.play().catch(err => console.error("Music playback failed:", track, err));
    }
  }

  function setMusicVolume(volume) {
    musicPlayer.volume = volume;
  }

  /**
   * Registers a one-time callback for when the CURRENT music player
   * naturally finishes (only meaningful for non-looping tracks — a
   * looping player never fires 'ended'). Used for slides that need
   * to know when a closing track has run its course on its own.
   */
  function onMusicEnded(callback) {
    musicPlayer.addEventListener('ended', callback, { once: true });
  }

  /**
   * Gradually changes the CURRENT music track's volume to `targetVolume`
   * over `durationMs`, without switching tracks. Used for in-place
   * swells/ducks (e.g. rising to full volume after a VO ends).
   */
  function fadeMusicTo(targetVolume, durationMs) {
    const player = musicPlayer;
    const startVolume = player.volume;
    const steps = 20;
    const stepMs = durationMs / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      player.volume = startVolume + (targetVolume - startVolume) * progress;
      if (step >= steps) {
        clearInterval(interval);
        player.volume = targetVolume;
      }
    }, stepMs);
  }

  /**
   * Fades BOTH the current VO and music out to silence over
   * `durationMs`, then pauses both. Used for a final, full close
   * (e.g. end-of-presentation), not a track-to-track handoff.
   */
  function fadeOutAll(durationMs, onComplete) {
    const voStart = voPlayer.volume;
    const musicStart = musicPlayer.volume;
    const steps = 20;
    const stepMs = durationMs / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      voPlayer.volume = Math.max(0, voStart * (1 - progress));
      musicPlayer.volume = Math.max(0, musicStart * (1 - progress));
      if (step >= steps) {
        clearInterval(interval);
        voPlayer.pause();
        musicPlayer.pause();
        if (onComplete) onComplete();
      }
    }, stepMs);
  }

  /**
   * Crossfades from whatever music is currently playing to a new
   * track: simultaneously fades the outgoing track's volume down to 0
   * while the incoming track fades up to `volume`, over `durationMs`.
   * The outgoing player is paused/discarded once the fade completes.
   */
  function crossfadeMusic(newTrack, volume = 0.4, durationMs = 2000, loop = true) {
    if (!newTrack) return;

    const outgoingPlayer = musicPlayer;
    const outgoingStartVolume = outgoingPlayer.volume;

    const incomingPlayer = new Audio(newTrack);
    incomingPlayer.loop = loop;
    incomingPlayer.volume = 0;
    incomingPlayer.play().catch(err => console.error("Crossfade incoming track failed:", newTrack, err));

    musicPlayer = incomingPlayer;
    currentMusicTrack = newTrack;

    const steps = 20;
    const stepMs = durationMs / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      outgoingPlayer.volume = Math.max(0, outgoingStartVolume * (1 - progress));
      incomingPlayer.volume = Math.min(volume, volume * progress);
      if (step >= steps) {
        clearInterval(interval);
        outgoingPlayer.pause();
        incomingPlayer.volume = volume;
      }
    }, stepMs);
  }

  function pauseAll() {
    voPlayer.pause();
    musicPlayer.pause();
  }

  function resumeAll() {
    voPlayer.play().catch(() => {});
    musicPlayer.play().catch(() => {});
  }

  return {
    playVO,
    fadeInVO,
    pauseVO,
    resumeVO,
    stopVO,
    setMusic,
    crossfadeMusic,
    fadeMusicTo,
    fadeOutAll,
    onMusicEnded,
    setMusicVolume,
    pauseAll,
    resumeAll
  };
})();

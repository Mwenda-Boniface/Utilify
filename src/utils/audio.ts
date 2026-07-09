/**
 * Simple audio utility to generate beeps without external assets.
 * Perfect for offline-first applications.
 */

const playBeep = (frequency: number, duration: number, volume: number = 0.1) => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error('Audio feedback failed:', e);
  }
};

export const playSuccessSound = () => {
  // High pitched pleasant double beep
  playBeep(880, 0.1);
  setTimeout(() => playBeep(1109, 0.1), 100);
};

export const playErrorSound = () => {
  // Low pitched discordant beep
  playBeep(220, 0.3, 0.2);
};

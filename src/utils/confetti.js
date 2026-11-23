import confetti from 'canvas-confetti';

export const triggerConfetti = (originX = 0.5, originY = 0.6) => {
  // Fire main burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: originX, y: originY },
    colors: ['#3B82F6', '#8B5CF6', '#5C6CDB', '#38BDF8', '#FFFFFF'],
    ticks: 200,
    gravity: 1.1,
    scalar: 1,
    drift: 0,
  });

  // Secondary burst slightly delayed for rich celebratory effect
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: Math.max(0.1, originX - 0.2), y: originY },
      colors: ['#60A5FA', '#A78BFA', '#5C6CDB'],
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: Math.min(0.9, originX + 0.2), y: originY },
      colors: ['#38BDF8', '#C084FC', '#FFFFFF'],
    });
  }, 150);
};

export const triggerSubtleConfetti = (event) => {
  if (!event) {
    triggerConfetti(0.5, 0.5);
    return;
  }
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;
  triggerConfetti(x, y);
};

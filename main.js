// Wave Accordion Interactivity
document.querySelectorAll('.wave-section').forEach(section => {
  // Hide headline and content initially
  const headline = section.querySelector('.wave-headline');
  const content = section.querySelector('.wave-content');
  headline.style.opacity = 0;
  content.style.maxHeight = '0';
  content.style.overflow = 'hidden';
  content.style.transition = 'max-height 0.4s cubic-bezier(.77,0,.18,1), opacity 0.3s';

  // Show headline on hover/focus
  section.addEventListener('mouseenter', () => {
    headline.style.opacity = 1;
  });
  section.addEventListener('mouseleave', () => {
    if (!section.classList.contains('open')) {
      headline.style.opacity = 0;
    }
  });
  section.addEventListener('focus', () => {
    headline.style.opacity = 1;
  });
  section.addEventListener('blur', () => {
    if (!section.classList.contains('open')) {
      headline.style.opacity = 0;
    }
  });

  // Toggle content on click
  section.addEventListener('click', () => {
    const isOpen = section.classList.toggle('open');
    if (isOpen) {
      headline.style.opacity = 1;
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = 1;
    } else {
      content.style.maxHeight = '0';
      content.style.opacity = 0;
    }
  });
});

// --- Improved Wave Animation ---
const wavePaths = document.querySelectorAll('.wave-path');
const baseY = 30; // vertical center
const minAmp = 20; // minimum amplitude
const maxAmp = 50; // maximum amplitude
const width = 800;

// Assign each wave a unique phase, amplitude, and frequency for out-of-sync motion
const waveParams = Array.from(wavePaths).map((_, i) => ({
  phaseOffset: Math.random() * Math.PI * 2,
  freq: 0.2 + Math.random() * 0.15, // slightly different speed for each
  ampBase: minAmp + Math.random() * (maxAmp - minAmp) * 0.7, // different base amplitude
  ampVar: 10 + Math.random() * 10 // how much amplitude can vary
}));

function animateWaves() {
  const now = performance.now() / 1000; // seconds
  wavePaths.forEach((path, i) => {
    const { phaseOffset, freq, ampBase, ampVar } = waveParams[i];
    // Amplitude oscillates over time, never exceeding maxAmp
    const amp = Math.min(
      maxAmp,
      ampBase + Math.sin(now * freq + phaseOffset) * ampVar
    );

    // Single smooth hump, similar to your image
    // Control point at 1/3 and 2/3 of the width
    const c1x = width / 3, c2x = 2 * width / 3;
    const c1y = baseY - amp;
    const c2y = baseY + amp;
    const d = `M0,${baseY} C${c1x},${c1y} ${c2x},${c2y} ${width},${baseY}`;
    path.setAttribute('d', d);
  });
  requestAnimationFrame(animateWaves);
}
animateWaves();
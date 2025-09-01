import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);

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
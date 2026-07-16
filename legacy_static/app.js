const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');

// CONFIGURATION
const FRAME_COUNT = 120;
const DEFAULT_FOLDER = './new_frames'; // Fallback folder (1280x720)

// Responsive image folders. Change these paths when you add higher resolution frames.
const RESOLUTION_FOLDERS = {
  small: './new_frames',    // 1280x720 frames for small screens / mobile
  medium: './new_frames',   // Replace with './new_frames_md' (1920x1080) when ready
  large: './new_frames'     // Replace with './new_frames_lg' (2560x1440+) when ready
};

const images = new Array(FRAME_COUNT).fill(null);
const loadingStarted = new Set();
const PRELOAD_WINDOW = 15; // Number of frames to load ahead/behind current position

const frameState = {
  current: 0,
  target: 0
};

let scrollableHeight = 0;
let lastRenderedIndex = -1;
let lastRenderedWidth = -1;
let lastRenderedHeight = -1;
let lastPreloadedIndex = -1;

// Determine preferred folder on startup
function getPreferredFolder() {
  const width = window.innerWidth;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const physicalWidth = width * dpr;

  if (physicalWidth <= 1280) {
    return RESOLUTION_FOLDERS.small;
  } else if (physicalWidth <= 1920) {
    return RESOLUTION_FOLDERS.medium;
  } else {
    return RESOLUTION_FOLDERS.large;
  }
}

const preferredFolder = getPreferredFolder();

function currentFrameUrl(index, folder) {
  const paddedIndex = String(index).padStart(3, '0');
  return `${folder}/ezgif-frame-${paddedIndex}.jpg`;
}

function ensureFrameLoaded(index) {
  if (index < 0 || index >= FRAME_COUNT) return;
  if (loadingStarted.has(index)) return;

  loadingStarted.add(index);

  const img = new Image();
  img.src = currentFrameUrl(index + 1, preferredFolder);

  img.onload = () => {
    images[index] = img;
    render();
  };

  img.onerror = () => {
    // If the preferred folder failed (e.g. 404), fallback to the default folder
    if (preferredFolder !== DEFAULT_FOLDER && img.src.indexOf(DEFAULT_FOLDER) === -1) {
      console.warn(`Failed to load frame ${index + 1} from ${preferredFolder}, falling back to ${DEFAULT_FOLDER}`);
      const fallbackImg = new Image();
      fallbackImg.src = currentFrameUrl(index + 1, DEFAULT_FOLDER);
      fallbackImg.onload = () => {
        images[index] = fallbackImg;
        render();
      };
      fallbackImg.onerror = () => {
        images[index] = null;
      };
    } else {
      images[index] = null;
    }
  };
}

function preloadAround(currentIndex) {
  const rounded = Math.round(currentIndex);
  
  // 1. Current frame has highest priority
  ensureFrameLoaded(rounded);

  // 2. Load surrounding frames in the window
  for (let i = 1; i <= PRELOAD_WINDOW; i++) {
    ensureFrameLoaded(rounded + i);
    ensureFrameLoaded(rounded - i);
  }
}

// Background idle frame preloader to load the rest of the sequence sequentially
let backgroundLoadIndex = 0;
function loadNextBackgroundFrame() {
  if (backgroundLoadIndex >= FRAME_COUNT) return;

  while (backgroundLoadIndex < FRAME_COUNT && loadingStarted.has(backgroundLoadIndex)) {
    backgroundLoadIndex++;
  }

  if (backgroundLoadIndex < FRAME_COUNT) {
    ensureFrameLoaded(backgroundLoadIndex);
    setTimeout(loadNextBackgroundFrame, 50); // 50ms interval to prevent network congestion
  }
}

// Start preloading initial frame/neighbors and background queue
preloadAround(frameState.current);
loadNextBackgroundFrame();

function updateScrollableHeight() {
  scrollableHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  ) - window.innerHeight;
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  
  // Update CSS size to fit viewport cleanly
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  
  // Set internal canvas resolution scaled by devicePixelRatio
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  
  updateScrollableHeight();
  render(true); // Force render on resize to redraw current frame
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function updateTargetFrame() {
  if (scrollableHeight <= 0) return;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const scrollFraction = Math.max(0, Math.min(1, scrollTop / scrollableHeight));
  frameState.target = scrollFraction * (FRAME_COUNT - 1);
}

window.addEventListener('scroll', updateTargetFrame, { passive: true });
window.addEventListener('wheel', updateTargetFrame, { passive: true });
updateTargetFrame();

function drawImageCover(img) {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  const imgRatio = imgWidth / imgHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth, drawHeight, offsetX, offsetY;

  if (canvasRatio > imgRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * imgRatio;
    drawHeight = canvasHeight;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Apply high-quality image smoothing context settings
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

function getClosestLoadedImage(index) {
  if (images[index]) return images[index];

  let left = index - 1;
  let right = index + 1;
  while (left >= 0 || right < FRAME_COUNT) {
    if (left >= 0 && images[left]) return images[left];
    if (right < FRAME_COUNT && images[right]) return images[right];
    left--;
    right++;
  }
  return null;
}

function render(force = false) {
  const index = Math.round(frameState.current);
  const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
  
  const img = getClosestLoadedImage(clampedIndex);
  if (!img) return;

  const currentWidth = canvas.width;
  const currentHeight = canvas.height;
  const imgIndex = images.indexOf(img);

  // Skip draw calls if the target image and dimensions are unchanged
  if (!force && imgIndex === lastRenderedIndex && currentWidth === lastRenderedWidth && currentHeight === lastRenderedHeight) {
    return;
  }

  drawImageCover(img);
  lastRenderedIndex = imgIndex;
  lastRenderedWidth = currentWidth;
  lastRenderedHeight = currentHeight;
}

function animate() {
  updateTargetFrame();
  
  const currentRounded = Math.round(frameState.current);
  if (currentRounded !== lastPreloadedIndex) {
    preloadAround(currentRounded);
    lastPreloadedIndex = currentRounded;
  }

  const diff = frameState.target - frameState.current;
  if (Math.abs(diff) > 0.001) {
    frameState.current += diff * 0.15;
    render();
  } else if (frameState.current !== frameState.target) {
    frameState.current = frameState.target;
    render();
  }
  requestAnimationFrame(animate);
}

animate();

/* ======================================================== */
/* INTERACTIVE SINGLE PAGE LOGIC & NAVIGATION                */
/* ======================================================== */

// Toast Notifications
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  toastText.innerText = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
  }, 3000);
}

// Smooth Section Scrolling
function scrollToSection(id, btn) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
  if (btn) {
    document.querySelectorAll('.nav-tab').forEach(el => {
      el.classList.remove('text-white', 'border-gold', 'font-bold');
      el.classList.add('text-white/50', 'border-transparent');
    });
    btn.classList.remove('text-white/50', 'border-transparent');
    btn.classList.add('text-white', 'border-gold', 'font-bold');
  }
}

// Menu Modal
function toggleMenu(show) {
  document.getElementById('menu-modal').classList.toggle('hidden', !show);
}

function selectMenuItem(id) {
  toggleMenu(false);
  scrollToSection(id);
}

// Services & Contact Modals
function toggleServicesModal(show) {
  document.getElementById('services-modal').classList.toggle('hidden', !show);
}

function toggleBookCallModal(show) {
  document.getElementById('book-call-modal').classList.toggle('hidden', !show);
  if (!show) {
    document.getElementById('book-call-form').classList.remove('hidden');
    document.getElementById('form-success').classList.add('hidden');
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  document.getElementById('book-call-form').classList.add('hidden');
  document.getElementById('form-success').classList.remove('hidden');
  showToast('Vertrauliche Anfrage erfolgreich übermittelt!');
}

function handleInlineFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  showToast('Vielen Dank! Ihre Nachricht wurde vertraulich übermittelt.');
}

// Project Details Trigger
function showProjectDetails(title, location) {
  showToast(`Anfrage gestartet für: ${title} (${location})`);
  toggleBookCallModal(true);
}

// Filter Projects in Section 4
function filterProjects(category, btn) {
  document.querySelectorAll('.project-filter-btn').forEach(el => {
    el.classList.remove('bg-gold', 'text-black');
    el.classList.add('bg-black/60', 'text-white/70', 'border', 'border-white/20');
  });
  btn.classList.remove('bg-black/60', 'text-white/70', 'border', 'border-white/20');
  btn.classList.add('bg-gold', 'text-black');

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (category === 'all' || card.classList.contains(category)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

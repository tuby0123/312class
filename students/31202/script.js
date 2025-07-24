function openWindow(id) {
  const windowEl = document.getElementById(id + 'Window');
  windowEl.style.display = 'block';
}

function closeWindow(id) {
  document.getElementById(id + 'Window').style.display = 'none';
}

// Light/Dark mode toggle
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const btn = document.getElementById('modeToggleBtn');
  btn.innerText = document.body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';
}

// Drag window
let offsetX, offsetY, dragged = null;

document.querySelectorAll('.window-header').forEach(header => {
  header.addEventListener('mousedown', e => {
    dragged = header.parentElement;
    offsetX = e.clientX - dragged.offsetLeft;
    offsetY = e.clientY - dragged.offsetTop;
    document.addEventListener('mousemove', moveWindow);
    document.addEventListener('mouseup', stopMove);
  });
});

function moveWindow(e) {
  if (!dragged) return;
  dragged.style.left = e.clientX - offsetX + 'px';
  dragged.style.top = e.clientY - offsetY + 'px';
}

function stopMove() {
  dragged = null;
  document.removeEventListener('mousemove', moveWindow);
  document.removeEventListener('mouseup', stopMove);
}

// ResizeObserver to adjust font size based on window width
const resizeObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    const width = entry.contentRect.width;
    const body = entry.target.querySelector('.window-body');
    if (body) {
      const newSize = Math.max(12, Math.min(24, width / 25)); // 12px~24px 제한
      body.style.fontSize = `${newSize}px`;
    }
  });
});

document.querySelectorAll('.popup').forEach(popup => {
  resizeObserver.observe(popup);
});

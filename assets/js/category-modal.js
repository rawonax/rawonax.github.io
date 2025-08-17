(function () {
  const modal = document.getElementById('category-modal');
  if (!modal) return;

  const openers = Array.from(document.querySelectorAll('a[href^="/categories/"]'));
  const backdrop = modal.querySelector('.cat-modal__backdrop');
  const closeBtns = Array.from(modal.querySelectorAll('[data-cat-close]'));
  const dialog = modal.querySelector('.cat-modal__dialog');
  const grid = modal.querySelector('.cat-modal__grid');
  const search = modal.querySelector('#catSearch');

  let lastFocused = null;

  function openModal(e) {
    if (e) e.preventDefault();
    lastFocused = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('cat-modal-open');
    trapFocus();
    if (search) search.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('cat-modal-open');
    releaseFocus();
    if (lastFocused) lastFocused.focus();
  }

  // Intercept category link clicks
  openers.forEach((a) => {
    a.addEventListener('click', openModal);
  });

  // Close interactions
  closeBtns.forEach((btn) => btn.addEventListener('click', closeModal));
  backdrop && backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      e.stopPropagation();
      closeModal();
    }
  });

  // Search filter
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      const items = modal.querySelectorAll('[data-cat-item]');
      items.forEach((li) => {
        const keys = li.getAttribute('data-cat-keywords') || '';
        li.style.display = keys.includes(q) ? '' : 'none';
      });
    });
  }

  // Keyboard navigation within grid
  grid && grid.addEventListener('keydown', (e) => {
    const focusables = Array.from(grid.querySelectorAll('a[data-cat-link]'));
    const idx = focusables.indexOf(document.activeElement);
    if (idx === -1) return;

    const cols = getComputedStyle(grid).getPropertyValue('--cat-cols');
    const colCount = parseInt(cols, 10) || 3;

    switch (e.key) {
      case 'ArrowRight': {
        e.preventDefault();
        const next = focusables[Math.min(idx + 1, focusables.length - 1)];
        next && next.focus();
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        const prev = focusables[Math.max(idx - 1, 0)];
        prev && prev.focus();
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        const next = focusables[Math.min(idx + colCount, focusables.length - 1)];
        next && next.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = focusables[Math.max(idx - colCount, 0)];
        prev && prev.focus();
        break;
      }
      default:
        break;
    }
  });

  // Focus trap
  let focusHandler = null;
  function trapFocus() {
    focusHandler = (e) => {
      if (modal.getAttribute('aria-hidden') === 'true') return;
      if (!dialog.contains(e.target)) {
        e.stopPropagation();
        dialog.focus();
      }
    };
    document.addEventListener('focus', focusHandler, true);
  }
  function releaseFocus() {
    if (focusHandler) {
      document.removeEventListener('focus', focusHandler, true);
      focusHandler = null;
    }
  }

  // Enter on card goes directly to href (default). No extra JS needed.
})();
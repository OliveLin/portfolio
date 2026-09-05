// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(a => {
  if (!a.closest('.nav-dropdown-toggle') && !a.closest('.nav-sub')) {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  }
});

// Dropdown: arrow toggles, text navigates
document.querySelectorAll('.nav-dropdown').forEach(item => {
  item.querySelector('.dropdown-arrow')?.addEventListener('click', (e) => {
    e.stopPropagation();
    item.classList.toggle('open');
  });
  // Also allow clicking the toggle row (not the link itself) to toggle
  item.querySelector('.nav-dropdown-toggle')?.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') item.classList.toggle('open');
  });
});

// Active link highlight + auto-open dropdown
const currentPage = location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links > li > a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

document.querySelectorAll('.nav-dropdown-toggle a').forEach(a => {
  if (a.getAttribute('href') === currentPage) {
    a.classList.add('active');
    a.closest('.nav-dropdown')?.classList.add('open');
  }
});

document.querySelectorAll('.nav-sub a').forEach(a => {
  if (a.getAttribute('href') === currentPage) {
    a.classList.add('active');
    a.closest('.nav-dropdown')?.classList.add('open');
  }
});

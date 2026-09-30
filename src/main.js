
import { router } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  router();
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-link]');
  if (!link) return;

  event.preventDefault();
  window.history.pushState({}, '', link.getAttribute('href'));
  router();
});

window.addEventListener('popstate', router);
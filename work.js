const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('[data-kind]')];
filters.hidden = false;
filters.addEventListener('click', (event) => {
  const selected = event.target.closest('button');
  if (!selected) return;
  for (const button of filters.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button === selected));
  }
  for (const project of projects) {
    project.hidden = selected.dataset.filter !== 'all' && selected.dataset.filter !== project.dataset.kind;
  }
  const count = projects.filter(project => !project.hidden).length;
  document.querySelector('#result-count').textContent = count + (count === 1 ? ' project shown.' : ' projects shown.');
});

const dialog = document.querySelector('#film');
const video = dialog.querySelector('video');
document.querySelector('#open-film').addEventListener('click', (event) => {
  if (!dialog.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  dialog.showModal();
  video.play().catch(() => {}); // Native controls remain available if playback is blocked.
});
dialog.addEventListener('close', () => {
  video.pause();
  video.currentTime = 0;
});

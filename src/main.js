import './style.css';
import { $, icons } from './ui.js';
import { startRouter } from './router.js';
import * as A from './actions.js';
import { jadwalList, setQuery, setFilter, rememberOpen } from './pages/jadwal.js';

const refreshList = () => { $('#list').innerHTML = jadwalList(); icons(); };

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const id = b.dataset.id;
  ({
    menu: () => $('#nav').classList.toggle('hidden'),
    complete: () => A.openDone(id),
    'close-done': A.closeDone,
    unassign: () => A.unassign(id),
    'open-reset': A.openReset,
    'close-reset': A.closeReset,
    'reset-all': A.resetAll,
    leave: () => A.toggleLeave(id),
    'rm-res': () => A.removeResident(id),
    'rm-task': () => A.removeTask(id),
  })[b.dataset.act]?.();
});

document.addEventListener('submit', (e) => {
  const kind = e.target.dataset.form; if (!kind) return;
  e.preventDefault();
  kind === 'done' ? A.confirmDone() : A.submitForm(e.target);
});

document.addEventListener('change', (e) => {
  if (e.target.dataset.assign && e.target.value) A.assign(e.target.dataset.assign, e.target.value);
  if (e.target.dataset.swap && e.target.value) A.swap(e.target.dataset.swap, e.target.value);
  if (e.target.id === 'filter') { setFilter(e.target.value); refreshList(); }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'q') { setQuery(e.target.value); refreshList(); }
});

// ingat accordion yang terbuka (event toggle tidak bubble, jadi pakai capture)
document.addEventListener('toggle', (e) => {
  const id = e.target.dataset?.rid;
  if (id) rememberOpen(id, e.target.open);
}, true);

startRouter();
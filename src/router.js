import { $, icons } from './ui.js';
import { pageBeranda } from './pages/beranda.js';
import { pageJadwal } from './pages/jadwal.js';
import { pageBuat } from './pages/buat.js';

const PAGES = { beranda: pageBeranda, jadwal: pageJadwal, buat: pageBuat };
const current = () => { const r = location.hash.replace('#/', ''); return PAGES[r] ? r : 'beranda'; };

export function render() {
  const r = current();
  $('#app').innerHTML = PAGES[r]();
  document.querySelectorAll('[data-route]').forEach((a) => {
    const on = a.dataset.route === r;
    a.classList.toggle('bg-white/20', on);
    a.setAttribute('aria-current', on ? 'page' : 'false');
  });
  $('#nav').classList.add('hidden');
  icons();
}


export function startRouter() {
  window.addEventListener('hashchange', () => { render(); window.scrollTo({ top: 0 }); });
  render();
}
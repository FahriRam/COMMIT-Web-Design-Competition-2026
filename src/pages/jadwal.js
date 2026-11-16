import { S, task, CAT, WEIGHT, STATUS } from '../store.js';
import { esc, badge } from '../ui.js';

let q = '', filter = 'all';
const open = new Set(S.residents.map((r) => r.id));

const assignBar = (r) => {
  const free = S.tasks.filter((t) => !S.assigns.some((a) => a.tid === t.id));
  const msg = !S.tasks.length ? 'Belum ada tugas, tambah di Buat Jadwal' : !free.length ? 'Semua tugas sudah dibagikan' : 'Pilih tugas untuk diberikan...';
  return `<div class="flex items-center gap-3 border-t border-slate-100 bg-paper/60 px-5 py-3">
    <label class="shrink-0 text-xs font-bold text-slate-500" for="as-${r.id}">Beri tugas</label>
    <select id="as-${r.id}" data-assign="${r.id}" class="field !py-2 !text-sm" ${free.length ? '' : 'disabled'}><option value="">${msg}</option>${free.map((t) => `<option value="${t.id}">${esc(t.title)} (${WEIGHT[t.w][0]}, ${esc(t.day)})</option>`).join('')}</select>
  </div>`;
};

export function jadwalList() {
  if (!S.residents.length) return `<p class="card text-center text-slate-500">Belum ada penghuni. <a href="#/buat" class="font-bold text-brand underline">Tambah penghuni di Buat Jadwal</a>.</p>`;
  const list = S.residents.map((r) => {
    const items = S.assigns.filter((a) => a.rid === r.id);
    return { r, items, done: items.filter((a) => a.status === 'done').length };
  }).filter(({ r, items, done }) => {
    const t = q.toLowerCase();
    const hit = !t || r.name.toLowerCase().includes(t) || r.room.toLowerCase().includes(t) || items.some((a) => task(a.tid)?.title.toLowerCase().includes(t));
    if (!hit) return false;
    if (filter === 'incomplete') return items.some((a) => a.status !== 'done');
    if (filter === 'completed') return items.length > 0 && done === items.length;
    return true;
  });
  if (!list.length) return `<p class="card text-center text-slate-500">Tidak ada penghuni yang cocok dengan pencarian atau filter ini.</p>`;

  return list.map(({ r, items, done }) => {
    const pct = items.length ? Math.round((done / items.length) * 100) : 0;
    const targets = S.residents.filter((x) => x.id !== r.id && !x.onLeave);
    return `
    <details data-rid="${r.id}" class="card group p-0" ${open.has(r.id) ? 'open' : ''}>
      <summary class="flex cursor-pointer items-center gap-4 p-5">
        <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white">${esc(r.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase())}</span>
        <span class="min-w-0 flex-1">
          <span class="block truncate font-extrabold">${esc(r.name)} ${r.onLeave ? badge('bg-slate-100 text-slate-600', 'Cuti', 'plane') : ''}</span>
          <span class="text-sm text-slate-500">${esc(r.room)} &middot; ${items.length} tugas &middot; ${done} selesai</span>
          <span class="mt-2 block h-1.5 rounded-full bg-slate-100"><span class="block h-1.5 rounded-full bg-accent" style="width:${pct}%"></span></span>
        </span>
        <i data-lucide="chevron-down" class="size-5 shrink-0 text-slate-400 transition group-open:rotate-180"></i>
      </summary>
      ${assignBar(r)}
      <div class="divide-y divide-slate-100 border-t border-slate-100">
        ${items.length ? items.map((a) => {
          const t = task(a.tid); if (!t) return '';
          const st = STATUS[a.status];
          return `
          <div class="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
            <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper text-brand"><i data-lucide="${CAT[t.cat][0]}" class="size-5"></i></span>
            <div class="min-w-0 flex-1">
              <p class="font-bold">${esc(t.title)}</p>
              <p class="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">${esc(t.day)} ${badge(WEIGHT[t.w][1], WEIGHT[t.w][0])} ${badge(st[1], st[0], st[2])}</p>
              ${a.note ? `<p class="mt-2 text-sm text-slate-600">&ldquo;${esc(a.note)}&rdquo; <span class="text-xs text-slate-400">${esc(a.at)}</span></p>` : ''}
            </div>
            <div class="flex flex-wrap items-center gap-2">
              ${a.status === 'done' ? '' : `<button data-act="complete" data-id="${a.id}" class="btn-accent !px-4 !py-2 !text-xs"><i data-lucide="circle-check" class="size-4"></i>Selesai</button>
              <select data-swap="${a.id}" aria-label="Alihkan tugas" class="field !w-auto !py-2 !text-xs"><option value="">Alihkan ke...</option>${targets.map((x) => `<option value="${x.id}">${esc(x.name)} (${esc(x.room)})</option>`).join('')}</select>`}
              <button data-act="unassign" data-id="${a.id}" aria-label="Lepas tugas ${esc(t.title)}" class="rounded-full p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><i data-lucide="x" class="size-4"></i></button>
            </div>
          </div>`;
        }).join('') : `<p class="p-5 text-sm text-slate-500">Belum ada tugas. Pilih dari dropdown di atas.</p>`}
      </div>
    </details>`;
  }).join('');
}

export function pageJadwal() {
  return `
  <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div><h1 class="text-2xl font-extrabold sm:text-3xl">Jadwal piket</h1><p class="text-slate-600">Buka nama penghuni untuk melihat dan memberi tugas.</p></div>
    <a href="#/buat" class="btn-brand"><i data-lucide="plus" class="size-4"></i>Buat jadwal</a>
  </div>
  <div class="mb-4 flex flex-col gap-3 sm:flex-row">
    <label class="relative flex-1"><span class="sr-only">Cari</span><i data-lucide="search" class="absolute left-3 top-3.5 size-4 text-slate-400"></i>
      <input id="q" value="${esc(q)}" placeholder="Cari nama, kamar, atau tugas" class="field !pl-9" /></label>
    <select id="filter" aria-label="Filter status" class="field sm:!w-52">
      <option value="all" ${filter === 'all' ? 'selected' : ''}>Semua penghuni</option>
      <option value="incomplete" ${filter === 'incomplete' ? 'selected' : ''}>Masih ada tugas</option>
      <option value="completed" ${filter === 'completed' ? 'selected' : ''}>Semua tugas selesai</option>
    </select>
  </div>
  <div id="list" class="space-y-3">${jadwalList()}</div>`;
}


// state pencarian dan accordion, diatur dari main.js
export const setQuery = (v) => { q = v; };
export const setFilter = (v) => { filter = v; };
export const rememberOpen = (id, isOpen) => { isOpen ? open.add(id) : open.delete(id); };
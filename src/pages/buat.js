import { S, load, CAT, WEIGHT, DAYS } from '../store.js';
import { esc } from '../ui.js';

export function pageBuat() {
  const opts = (o) => o.map(([v, l]) => `<option value="${v}">${l}</option>`).join('');
  return `
  <div class="mb-6"><h1 class="text-2xl font-extrabold sm:text-3xl">Buat jadwal</h1><p class="text-slate-600">Kelola penghuni dan daftar tugas. Tugas dibagikan dari halaman Jadwal.</p></div>

  <div class="grid gap-6 lg:grid-cols-2">
    <section class="card">
      <h2 class="flex items-center gap-2 text-lg font-extrabold"><i data-lucide="users" class="size-5 text-brand"></i>Data mahasiswa kos</h2>
      <form data-form="resident" class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <div><label class="label" for="rn">Nama</label><input id="rn" name="name" required class="field" placeholder="Nama penghuni" /></div>
        <div><label class="label" for="rr">Kamar</label><input id="rr" name="room" required class="field" placeholder="Kamar 07" /></div>
        <button class="btn-brand col-span-2 self-end sm:col-span-1"><i data-lucide="user-plus" class="size-4"></i>Tambah</button>
      </form>
      ${S.residents.length ? '' : '<p class="mt-4 text-sm text-slate-500">Belum ada penghuni.</p>'}
      <ul class="mt-4 divide-y divide-slate-100">
        ${S.residents.map((r) => `
        <li class="flex items-center justify-between gap-2 py-3">
          <span class="min-w-0"><span class="block truncate font-semibold">${esc(r.name)}</span><span class="text-xs text-slate-500">${esc(r.room)} &middot; beban ${load(r.id)}</span></span>
          <span class="flex shrink-0 gap-1">
            <button data-act="leave" data-id="${r.id}" class="btn-ghost !px-3 !py-1.5 !text-xs ${r.onLeave ? '!border-amber-300 !bg-amber-50' : ''}"><i data-lucide="plane" class="size-3.5"></i>${r.onLeave ? 'Cuti' : 'Aktif'}</button>
            <button data-act="rm-res" data-id="${r.id}" aria-label="Hapus ${esc(r.name)}" class="rounded-full p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><i data-lucide="trash-2" class="size-4"></i></button>
          </span>
        </li>`).join('')}
      </ul>
    </section>

    <section class="card">
      <h2 class="flex items-center gap-2 text-lg font-extrabold"><i data-lucide="clipboard-list" class="size-5 text-brand"></i>Daftar tugas kebersihan</h2>
      <form data-form="task" class="mt-4 grid grid-cols-2 gap-3">
        <div class="col-span-2"><label class="label" for="tt">Nama tugas</label><input id="tt" name="title" required class="field" placeholder="Contoh: Lap meja makan" /></div>
        <div><label class="label" for="tc">Kategori</label><select id="tc" name="cat" class="field">${opts(Object.entries(CAT).map(([k, v]) => [k, v[1]]))}</select></div>
        <div><label class="label" for="tw">Bobot</label><select id="tw" name="w" class="field">${opts([[1, 'Ringan'], [2, 'Sedang'], [3, 'Berat']])}</select></div>
        <div><label class="label" for="td">Hari</label><select id="td" name="day" class="field">${opts(DAYS.map((d) => [d, d]))}</select></div>
        <button class="btn-brand self-end"><i data-lucide="plus" class="size-4"></i>Tambah tugas</button>
      </form>
      ${S.tasks.length ? '' : '<p class="mt-4 text-sm text-slate-500">Belum ada tugas.</p>'}
      <ul class="mt-4 divide-y divide-slate-100">
        ${S.tasks.map((t) => `
        <li class="flex items-center justify-between gap-2 py-3">
          <span class="flex min-w-0 items-center gap-3"><i data-lucide="${CAT[t.cat][0]}" class="size-5 shrink-0 text-brand"></i>
            <span class="min-w-0"><span class="block truncate font-semibold">${esc(t.title)}</span><span class="text-xs text-slate-500">${esc(t.day)} &middot; ${WEIGHT[t.w][0]} &middot; ${t.pts} poin</span></span></span>
          <button data-act="rm-task" data-id="${t.id}" aria-label="Hapus ${esc(t.title)}" class="rounded-full p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><i data-lucide="trash-2" class="size-4"></i></button>
        </li>`).join('')}
      </ul>
    </section>
  </div>

  <section class="card mt-6 flex flex-wrap items-center justify-between gap-3 !border-rose-200">
    <div><h2 class="font-extrabold">Reset data</h2><p class="text-sm text-slate-600">Hapus semua penghuni, tugas, dan jadwal. Tidak bisa dibatalkan.</p></div>
    <button data-act="open-reset" class="btn bg-rose-600 text-white hover:bg-rose-700"><i data-lucide="trash-2" class="size-4"></i>Reset semua data</button>
  </section>`;
}
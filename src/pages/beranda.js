import { S, stats } from '../store.js';
import { esc } from '../ui.js';

export function pageBeranda() {
  const s = stats();
  const top = [...S.residents].sort((a, b) => b.points - a.points).slice(0, 3);
  const feats = [
    ['users', 'Data mahasiswa kos', 'Catat penghuni, nomor kamar, dan status cuti agar yang pulang kampung otomatis dilewati.'],
    ['clipboard-list', 'Daftar tugas kebersihan', 'Atur tugas, hari, dan bobotnya: ringan, sedang, atau berat.'],
    ['sparkles', 'Pembagian tugas', 'Pilih tugas untuk tiap penghuni langsung dari halaman Jadwal.'],
  ];
  return `
  <section class="overflow-hidden rounded-3xl bg-brand p-8 text-white sm:p-12">
    <p class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold"><span class="size-2 rounded-full bg-cyan-200"></span>Sistem piket anak kos</p>
    <h1 class="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">Satu tempat untuk semua jadwal piket kos</h1>
    <p class="mt-3 max-w-xl text-blue-50">${s.d} dari ${s.t} tugas sudah selesai.</p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a href="#/jadwal" class="btn-accent"><i data-lucide="calendar" class="size-4"></i>Lihat jadwal piket</a>
      <a href="#/buat" class="btn border border-white/40 text-white hover:bg-white/15"><i data-lucide="plus" class="size-4"></i>Buat jadwal</a>
    </div>
  </section>

  <section class="mt-6 grid gap-4 sm:grid-cols-3">
    <div class="card"><p class="text-sm text-slate-500">Progres minggu ini</p><p class="mt-1 text-3xl font-extrabold text-brand">${s.p}%</p>
      <div class="mt-3 h-2 rounded-full bg-slate-100"><div class="h-2 rounded-full bg-accent" style="width:${s.p}%"></div></div></div>
    <div class="card"><p class="text-sm text-slate-500">Tugas selesai</p><p class="mt-1 text-3xl font-extrabold text-emerald-600">${s.d}<span class="text-lg text-slate-400"> / ${s.t}</span></p></div>
    <div class="card"><p class="text-sm text-slate-500">Tugas terlewat</p><p class="mt-1 text-3xl font-extrabold ${s.o ? 'text-rose-600' : 'text-slate-800'}">${s.o}</p></div>
  </section>

  <section class="mt-6 grid gap-4 md:grid-cols-3">
    ${feats.map(([ic, t, d]) => `<a href="#/buat" class="card block hover:border-brand/40"><span class="flex size-11 items-center justify-center rounded-2xl bg-brand/10 text-brand"><i data-lucide="${ic}" class="size-5"></i></span><h3 class="mt-4 font-extrabold">${t}</h3><p class="mt-1 text-sm text-slate-600">${d}</p></a>`).join('')}
  </section>

  <section class="card mt-6">
    <h2 class="flex items-center gap-2 text-lg font-extrabold"><i data-lucide="award" class="size-5 text-accent"></i>Poin tertinggi</h2>
    ${top.length ? '' : '<p class="mt-4 text-sm text-slate-500">Belum ada penghuni. <a href="#/buat" class="font-bold text-brand underline">Tambah penghuni</a> dulu.</p>'}
    <ol class="mt-4 divide-y divide-slate-100">
      ${top.map((r, i) => `<li class="flex items-center justify-between py-3"><span class="font-semibold">${i + 1}. ${esc(r.name)} <span class="text-sm font-normal text-slate-500">${esc(r.room)}</span></span><span class="font-extrabold text-brand">${r.points} poin</span></li>`).join('')}
    </ol>
  </section>`;
}
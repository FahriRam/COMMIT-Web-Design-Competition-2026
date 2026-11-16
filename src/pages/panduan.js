const FAQ = [
  ['Bagaimana cara menambah penghuni dan tugas?',
   'Buka halaman Buat Jadwal. Untuk penghuni, isi nama dan nomor kamar. Untuk tugas, isi nama tugas, kategori, bobot, dan harinya. Keduanya bisa dihapus kapan saja lewat ikon tempat sampah.'],
  ['Apa fungsi bobot tugas (Ringan, Sedang, Berat)?',
   'Tidak semua pekerjaan kos sama beratnya. Menyikat kamar mandi berbobot Berat (3), sedangkan membuang sampah berbobot Ringan (1). Bobot dipakai saat Acak jadwal supaya total beban tiap penghuni seimbang, dan juga menentukan poin: setiap tingkat bobot bernilai 15 poin.'],
  ['Bagaimana cara kerja Acak jadwal?',
   'Di halaman Jadwal, klik Acak jadwal. Semua tugas yang belum selesai dibagikan ulang secara acak ke penghuni yang aktif, sambil tetap menyeimbangkan total bobot. Penghuni berstatus Cuti dilewati, dan tugas yang sudah selesai tidak berubah.'],
  ['Bagaimana jika saya berhalangan di hari piket?',
   'Pada tugas milik kamu di halaman Jadwal, pilih penghuni lain lewat dropdown "Alihkan ke..." sesuai kesepakatan bersama. Kalau berhalangan lama, ubah statusmu menjadi Cuti di Buat Jadwal lalu klik Acak jadwal.'],
  ['Bagaimana cara memberi dan menyelesaikan tugas?',
   'Di halaman Jadwal, buka nama penghuni lalu pilih tugas di dropdown "Beri tugas". Setelah dikerjakan, klik Selesai, tulis catatan jika perlu, lalu klik Tugas selesai. Poin langsung bertambah di profil penghuni dan terlihat di Beranda.'],
  ['Di mana data saya disimpan?',
   'Data tersimpan di browser perangkat ini (localStorage), bukan di server. Jangan hapus data browser kalau ingin menyimpannya. Untuk mengosongkan semuanya, pakai tombol Reset semua data di halaman Buat Jadwal.'],
];

export function pagePanduan() {
  return `
  <section class="rounded-3xl bg-brand px-6 py-10 text-center text-white sm:py-14">
    <p class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide"><i data-lucide="book-open" class="size-4"></i>Panduan penggunaan sistem</p>
    <h1 class="mt-4 text-3xl font-extrabold sm:text-4xl">Cara kerja sistem piket Kosify</h1>
    <p class="mx-auto mt-3 max-w-xl text-blue-50">Pahami pembagian tugas, acak jadwal, dan cara mengalihkan tugas antar penghuni kamar.</p>
  </section>

  <div class="mx-auto mt-6 max-w-3xl space-y-4">
    ${FAQ.map(([q, a]) => `
    <article class="card">
      <h2 class="flex items-start gap-3 font-extrabold text-brand"><i data-lucide="circle-help" class="mt-0.5 size-5 shrink-0 text-accent"></i>${q}</h2>
      <p class="mt-2 pl-8 text-sm leading-relaxed text-slate-600">${a}</p>
    </article>`).join('')}
  </div>`;
}
# COMMIT-Web-Design-Competition-2026
Web Design Project for COMMIT's 2026

# 🚀 Website Manager Kegiatan Kos (Kosify)

> **Website yang dapat digunakan untuk membuat sistem piket dan membagi rata tugas aktivitas sehari-hari antar mahasiswa dalam suatu rumah atau apartemen kos**

---

## 👥 Nama Tim & Anggota

* **Nama Tim:** commat commit
* **Anggota Tim:**
  1. **Muhammad Fahri Ramadhan** - Ketua tim (koordinator) & Penyusun Laporan
  2. **Malik Irhamsyah Perani** - UI/UX Designer
  3. **Muhammad Farrel Abian** - Frontend Developer & UI/UX Designer
  4. **Rama Dianta Nararya** - QA Tester & Penyusun Laporan
---

## 📖 Deskripsi Proyek & Fitur Utama

### Deskripsi
Kosify adalah aplikasi web manager kegiatan kos yang dapat membantu membagi dan merotasi tugas piket dalam Rumah/Apartemen kos yang dihuni oleh mahasiswa secara otomatis. Pengguna cukup memasukkan jumlah penghuni, nama - nama penghuni, nomor kamar penghuni, dan daftar tugas yang dapat dilakukan, lalu sistem menampilkan jadwal yang adil lewat antarmuka dropdown. Seluruh penghuni merujuk pada satu jadwal yang sama, tanpa catatan kertas atau pesan berantai.

### Fitur Utama
- **Input Data Penghuni:** menambah, mengubah, dan menghapus data nama serta nomor kamar.
- **Daftar Tugas:** mengatur tugas kebersihan, seperti menyapu, mencuci peralatan dapur, dan membersihkan kamar mandi.
- **Penjadwalan Otomatis:** membagi dan merotasi tugas secara merata, harian maupun mingguan.
- **Tampilan Dropdown:** penghuni memilih nama atau nomor kamar untuk langsung melihat tugasnya.
- **Jadwal Keseluruhan:** tabel yang menunjukkan siapa mengerjakan apa pada periode tertentu.

---

## 🛠️ Teknologi yang Digunakan
- **Core & Build Tool:** HTML5, JavaScript (ES Modules), Vite, GitHub (Version Control).
- **Styling:** Tailwind CSS v4
- **Hosting & Deployment:** Netlify

## 📁 Penggunaan AI, template, starter code, dan sumber aset.
**Alat AI Yang digunakan**
- Claude (Anthropic): bantuan utama untuk debugging, perbaikan pada kode yang kurang efisien, dan pemecahan kode menjadi modul.
- GitHub Copilot (VS Code): bantuan saat menulis kode di editor, terutama untuk masalah teknis seperti syntax.

**Bagian Yang Dibantu AI**
- Claude, debugging: mencari penyebab dan memperbaiki error, error import modul, dan bug pada alur fitur.
- Claude, perbaikan kode: saran perbaikan kecil pada kode yang kurang efisien.
- Claude, struktur proyek: pemecahan kode menjadi modul ES: store.js, ui.js, actions.js, router.js, pages/.
- GitHub Copilot, penulisan kode: bantuan syntax dan masalah teknis saat menulis kode di VS Code.

**template**
- Vite (template vanilla): dasar proyek dan build tool. Lisensi MIT.

**Sumber Asset dan Pihak Ketiga**
- Lucide: ikon. Lisensi ISC.
- Plus Jakarta Sans (Google Fonts): font. Lisensi SIL Open Font License 1.1.

---

## 🌐 Tautan Deployment (Live Demo)

Website dapat diakses secara langsung melalui tautan berikut:
https://commint-kosify.netlify.app/

---

## ⚙️ Petunjuk Instalasi & Cara Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal:

### Prasyarat (*Prerequisites*)
* Node.js versi LTS terbaru (disarankan 20.19 atau lebih baru)
* npm (sudah ikut terpasang bersama Node.js)

### Langkah-langkah menjalankan secara lokal:
1. **Clone repositori dan masuk ke foldernya:**
   ```bash
   git clone https://github.com/FahriRam/COMMIT-Web-Design-Competition-2026
   cd COMMIT-Web-Design-Competition-2026
   ```
2. **Pasang Dependensi:**
   ```bash
   npm install
   ```
3. **Jalankan Server Pengembangan**
   ```bash
   npm run dev
   ```
4. **Buka alamat yang muncul di terminal**, Misalnya `http://localhost:5173`.

**Perintah lain**
  - Membuat versi produksi di folder dist
   ```bash
   npm run build
   ```
  - Menjalankan hasil build secara lokal untuk dicoba
   ```bash
   npm run preview
   ```


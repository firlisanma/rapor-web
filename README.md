This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 📘 Rapor Web MA Persis Katapang

Proyek ini merupakan bagian dari mata kuliah **Manajemen Kualitas Teknologi Informasi (MKTI)**.  
Tujuannya adalah membantu pihak **MA Persis Katapang** dalam mengembangkan sistem **rapor digital berbasis web** agar proses pengolahan dan pelaporan nilai menjadi lebih **efisien, terpusat, dan mudah diakses** oleh guru maupun siswa.

---

## 👥 Tim Pengembang
| Nama | Peran |
|------|--------|
| Firli Sandri Permana | Programmer |
| Reka Ayu Lestari | Designer |
| Nazwa | Analyst |
| Oktavia | Database Administrator |
| Andini | Documenter |

---

## 🧩 Tujuan Proyek
- Mempermudah guru dalam menginput nilai siswa melalui sistem digital.  
- Memberikan akses kepada siswa untuk melihat dan mengunduh rapor dalam bentuk digital (PDF).  
- Mempercepat proses rekap nilai dan pelaporan ke wali kelas maupun pihak sekolah.  
- Menyediakan data akademik yang aman, terpusat, dan mudah dikelola.

---

## ⚙️ Teknologi yang Digunakan
- **Frontend:** Next.js + Tailwind CSS  
- **Backend:** Node.js  
- **Database:** MySQL (melalui Prisma ORM)  
- **Version Control:** Git & GitHub  
- **Editor:** Visual Studio Code  

---

## 🔐 Peran Pengguna
### 1. Admin
- Mengelola data guru, siswa, kelas, dan mata pelajaran  
- Menentukan relasi guru–kelas–mapel  
- Membuat tahun ajaran baru dan memproses kenaikan kelas  

### 2. Guru
- Mengunduh template nilai (Excel/CSV)  
- Mengisi nilai dan mengunggah kembali ke sistem  
- Melihat rekap nilai dan rapor digital  

### 3. Siswa
- Login menggunakan akun masing-masing  
- Melihat nilai dan rapor digital  
- Mengunduh rapor (PDF)

---

## 🗂️ Struktur Database (Draft)
| Tabel | Deskripsi |
|-------|------------|
| tb_siswa | Data siswa (NIS, nama, kelas, status) |
| tb_guru | Data guru dan mapel yang diajar |
| tb_kelas | Daftar kelas (misal X IPA 1, XI IPS 2) |
| tb_mapel | Data mata pelajaran |
| tb_nilai | Nilai tiap siswa per mapel |
| tb_tahun_ajaran | Data tahun ajaran aktif |
| tb_siswa_kelas | Relasi siswa–kelas–tahun ajaran |
| tb_guru_mapel | Relasi guru–mapel–kelas |
| tb_user | Data login (username, password, role) |

---

## 🕒 Timeline Proyek
| Bulan | Tahapan | Output |
|--------|----------|---------|
| Oktober (minggu 3–4) | Observasi & analisis kebutuhan | Laporan observasi |
| November (minggu 1–3) | Desain sistem (ERD, flowchart, mockup) | Dokumen desain |
| Nov (minggu 4) – Des (minggu 2) | Implementasi awal (CRUD, login, dashboard) | Prototype 1 |
| Desember (minggu 3–4) | Integrasi input nilai & rapor PDF | Prototype 2 |
| Januari (minggu 1–2) | Uji coba & revisi | Final prototype |
| Januari (minggu 3–4) | Presentasi & laporan akhir | Website + dokumen akhir |

---

## 🧾 Dokumen Proyek
- [x] Checklist Observasi  
- [ ] Project Charter  
- [ ] ERD / Flowchart  
- [ ] Desain Mockup (Figma)  
- [ ] Source Code  
- [ ] Laporan Akhir  

---

## 💡 Catatan
Proyek ini masih dalam tahap pengembangan dan akan terus diperbarui berdasarkan hasil observasi dan umpan balik dari pihak sekolah.

---

export function raporTemplate(data) {
  const LOGO_BASE64 = 'data:image/png;base64,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'
  const {
    siswa,
    kelas,
    tahun,
    semester,
    nilai,
    sikap,
    absensi,
    ekskul,
    catatan_wali
  } = data;

  const catatan = catatan_wali || "-";

// ambil baris pertama sebagai Arab
const [arab, ...artiArr] = catatan.split("\n");
const arti = artiArr.join("\n");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: #000;
    }

    .header {
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  margin-bottom: 6px;
  border-bottom: 3px double #000;
}

.logo {
  width: 75px;
  margin-right: 10px;
}

.header-text {
      text-align: center;
      flex: 1;
    }

    h2, h3 {
      margin: 4px 0;
    }

    .judul {
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  margin: 14px 0 18px 0;
  letter-spacing: 1px;
}

.catatan-box {
  border: 1px solid #000;
  padding: 12px;
  margin-top: 8px;
}

.catatan-arab {
  direction: rtl;
  text-align: right;
  font-family: 'Amiri', serif;
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: -10px;
}

.catatan-arti {
  white-space: pre-line;
  line-height: 1.6;
}

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      border: 1px solid #000;
      padding: 5px;
      text-align: left;
    }

    th {
      background: #f2f2f2;
      text-align: center;
    }

    .no-border td {
  border: none;
  padding: 3px 6px;
  font-size: 12px;
}


    .page-break {
      page-break-before: always;
      margin-top: 20px;
    }

    .center {
      text-align: center;
    }
  </style>
</head>
<body>

<!-- ================= HEADER ================= -->
<div class="header">
  <img src="${LOGO_BASE64}" class="logo" />
  <div class="header-text">
    <h2>PESANTREN PERSIS 60 KATAPANG TINGKAT MU'ALLIMIN</h2>
    <div>Jl. Terusan Kopo Blk. No. 523 Bojongbuah Ds. Pangauban Kec. Katapang</div>
    <div>Kab. Bandung tlp. (022) 88886185</div>
  </div>
</div>

<!-- ================= JUDUL ================= -->
<div class="judul">
  HASIL PENILAIAN AKHIR SEMESTER
</div>

<!-- ================= IDENTITAS ================= -->
<table class="no-border">
  <tr>
    <td>Kelas</td><td>: ${kelas.nama_kelas}</td>
    <td>Tahun Pelajaran</td><td>: ${tahun.tahun_ajaran}</td>  
  </tr>
  <tr>
    <td>Nama</td><td>: ${siswa.nama_siswa}</td>
    <td>Semester</td><td>: ${semester === 1 ? "Ganjil" : "Genap"}</td>
  </tr>
  <tr>
    <td>NIS/NISN</td><td>: ${siswa.nis}/${siswa.nisn}</td>
  </tr>
</table>

<!-- ================= NILAI AKADEMIK ================= -->
<h3>Nilai Akademik</h3>
<table>
  <tr>
    <th>No</th> 
    <th>Mata Pelajaran</th> 
    <th>Nilai Angka</th>  
    <th>Nilai Huruf</th>  
  </tr>
  ${nilai.map((n, i) => `
    <tr>
      <td class="center">${i + 1}</td>
      <td>${n.mapel.nama_mapel}</td>
      <td class="center">${n.nilai_angka}</td>
      <td class="center">${terbilang(n.nilai_angka)}</td>
    </tr>
  `).join("")}
</table>

<!-- ================= PAGE 2 ================= -->
<div class="page-break"></div>

<!-- ================= EKSKUL ================= -->
<h3>Kegiatan Ekstrakurikuler</h3>
<table>
  <tr>
    <th>No</th>
    <th>Jenis Kegiatan</th>
    <th>Nilai</th>
  </tr>
  ${ekskul.map((e, i) => `
    <tr>
      <td class="center">${i + 1}</td>
      <td>${e.jenis_ekskul}</td>
      <td class="center">${e.nilai ?? "-"}</td>
    </tr>
  `).join("")}
</table>

<!-- ================= SIKAP ================= -->
<h3>Kepribadian</h3>
<table>
  <tr>
    <th>No</th>
    <th>Aspek</th>
    <th>Nilai</th>
  </tr>
  ${sikap.map((s, i) => `
    <tr>
      <td class="center">${i + 1}</td>
      <td>${s.sikap.nama_sikap}</td>
      <td class="center">${s.nilai}</td>
    </tr>
  `).join("")}
</table>

<!-- ================= ABSENSI ================= -->
<h3>Ketidakhadiran</h3>
<table>
  <tr><td>Sakit</td><td>${absensi?.sakit ?? 0} hari</td></tr>
  <tr><td>Izin</td><td>${absensi?.izin ?? 0} hari</td></tr>
  <tr><td>Tanpa Keterangan</td><td>${absensi?.alpa ?? 0} hari</td></tr>
</table>

<!-- ================= CATATAN ================= -->
<h3>Catatan Wali Kelas</h3>

<div class="catatan-box">
  <div class="catatan-arab">
    ${arab || ""}
  </div>

  <div class="catatan-arti">
    ${arti || ""}
  </div>
</div>

</body>
</html>
`;
}

/* ================= HELPER ================= */
function terbilang(n) {
  const angka = [
    "", "satu", "dua", "tiga", "empat",
    "lima", "enam", "tujuh", "delapan", "sembilan",
    "sepuluh", "sebelas"
  ];

  n = parseInt(n);

  if (n < 12) return angka[n];
  if (n < 20) return angka[n - 10] + " belas";
  if (n < 100) {
    return (
      angka[Math.floor(n / 10)] +
      " puluh " +
      angka[n % 10]
    ).trim();
  }
  if (n === 100) return "seratus";
  return "";
}
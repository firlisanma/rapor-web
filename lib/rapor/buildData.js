import { prisma } from "@/lib/prisma";

export async function buildRaporData({
  nisn,
  id_tahun_ajaran,
  semester
}) {
  // siswa + kelas
  const siswa = await prisma.siswa.findUnique({
    where: { nisn },
    include: {
      kelas: true
    }
  });

  if (!siswa || !siswa.kelas) {
  throw new Error("Data siswa atau kelas tidak ditemukan");
}

  const id_kelas = siswa.kelas.id_kelas;

  // tahun ajaran
  const tahun = await prisma.tahunAjaran.findUnique({
    where: { id_tahun_ajaran }
  });

  // nilai akademik
const rows = await prisma.$queryRaw`
  SELECT
    kk.kode_kelompok,
    kk.urutan,
    kk.kkm,
    mp.id_mapel,
    mp.nama_mapel,
    n.nilai_angka,
    n.nilai_huruf
  FROM kurikulum_kelas kk
  JOIN matapelajaran mp ON mp.id_mapel = kk.id_mapel
  LEFT JOIN nilai n
    ON n.id_mapel = kk.id_mapel
   AND n.nisn = ${nisn}
   AND n.id_tahun_ajaran = ${id_tahun_ajaran}
   AND n.semester = ${semester}
  WHERE kk.id_kelas = ${id_kelas}
    AND kk.aktif = 1
  ORDER BY kk.kode_kelompok, kk.urutan
`;

const kelompok = {
  A: {
    label: "A. Mata Pelajaran Wajib",
    rows: []
  },
  B: {
    label: "B. Mata Pelajaran Pilihan",
    rows: []
  },
  C: {
    label: "C. Peminatan / Lintas Minat",
    rows: []
  },
  D: {
    label: "D. Program Pesantren",
    rows: []
  }
};

let nomorGlobal = {
  A: 1,
  B: 1,
  C: 1,
  D: 1
};

for (const r of rows) {
  if (!kelompok[r.kode_kelompok]) continue;

  kelompok[r.kode_kelompok].rows.push({
    kode: r.kode_kelompok,
    urut: nomorGlobal[r.kode_kelompok]++,
    nama_mapel: r.nama_mapel,
    kkm: r.kkm,
    nilai_angka: r.nilai_angka ?? "-",
    nilai_huruf: r.nilai_huruf ?? "-"
  });
}

  // sikap
  const sikap = await prisma.sikapNilai.findMany({
    where: {
      nisn,
      id_tahun_ajaran,
      semester
    },
    include: {
      sikap: true
    }
  });

  // absensi
  const absensi = await prisma.absensiRekap.findFirst({
    where: {
      nisn,
      id_tahun_ajaran,
      semester
    }
  });

  // ekskul
  const ekskul = await prisma.ekskulNilai.findMany({
    where: {
      nisn,
      id_tahun_ajaran,
      semester
    }
  });

  // catatan wali
  const rapor = await prisma.rapor.findFirst({
    where: {
      nisn,
      id_tahun_ajaran,
      semester
    }
  });

  return {
    siswa,
    kelas: siswa.kelas,
    tahun,
    semester,
    kelompok,
    sikap,
    absensi,
    ekskul,
    catatan_wali: rapor?.catatan_wali ?? ""
  };
}

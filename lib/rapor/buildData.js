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

  // tahun ajaran
  const tahun = await prisma.tahunAjaran.findUnique({
    where: { id_tahun_ajaran }
  });

  // nilai akademik
  const nilai = await prisma.nilai.findMany({
    where: {
      nisn,
      id_tahun_ajaran,
      semester
    },
    include: {
      mapel: true
    },
    orderBy: {
      mapel: { nama_mapel: "asc" }
    }
  });

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
    nilai,
    sikap,
    absensi,
    ekskul,
    catatan_wali: rapor?.catatan_wali ?? ""
  };
}

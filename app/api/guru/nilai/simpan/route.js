import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // =========================
    // 1️⃣ AMBIL USER LOGIN
    // =========================
    const userHeader = req.headers.get("x-user"); 
    if (!userHeader) {
      return NextResponse.json(
        { status: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = JSON.parse(userHeader);

    if (user.roleId !== 2) {
      return NextResponse.json(
        { status: false, error: "Akses ditolak" },
        { status: 403 }
      );
    }

    const id_guru = user.id_guru;

    // =========================
    // 2️⃣ AMBIL BODY
    // =========================
    const { id_kelas, id_tahun_ajaran, semester, data } =
      await req.json();

    if (
      !id_kelas ||
      !id_tahun_ajaran ||
      !semester ||
      !Array.isArray(data)
    ) {
      return NextResponse.json(
        { status: false, error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // =========================
    // 3️⃣ VALIDASI MAPEL GURU
    // =========================
    const guru = await prisma.guru.findUnique({
  where: { id_guru }
});

if (!guru || !guru.id_mapel) {
  return NextResponse.json(
    { status: false, error: "Mapel guru tidak ditemukan" },
    { status: 400 }
  );
}

const id_mapel = guru.id_mapel;

    // =========================
    // 4️⃣ VALIDASI SISWA DALAM KELAS
    // =========================
    const nisnList = data.map(d => d.nisn);

    const siswaValid = await prisma.siswa.findMany({
      where: {
        nisn: { in: nisnList },
        id_kelas: Number(id_kelas)
      },
      select: { nisn: true }
    });

    const siswaSet = new Set(siswaValid.map(s => s.nisn));

    // =========================
    // 5️⃣ UPSERT NILAI (TRANSAKSI)
    // =========================
    for (const d of data) {
  if (!siswaSet.has(d.nisn)) continue;

  const existing = await prisma.nilai.findFirst({
    where: {
      nisn: d.nisn,
      id_mapel,
      id_tahun_ajaran: Number(id_tahun_ajaran),
      semester: Number(semester)
    }
  });

  if (existing) {
    await prisma.nilai.update({
      where: { id_nilai: existing.id_nilai },
      data: {
        nilai_angka: Number(d.nilai_angka)
      }
    });
  } else {
    await prisma.nilai.create({
      data: {
        nisn: d.nisn,
        id_mapel,
        id_guru,
        id_tahun_ajaran: Number(id_tahun_ajaran),
        semester: Number(semester),
        nilai_angka: Number(d.nilai_angka)
      }
    });
  }
}

    return NextResponse.json({
      status: true,
      message: "Nilai berhasil disimpan"
    });

  } catch (err) {
    console.error("ERROR SIMPAN NILAI:", err);
    return NextResponse.json(
      { status: false, error: "Server error" },
      { status: 500 }
    );
  }
}

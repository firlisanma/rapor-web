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

    if (user.id_role !== 2) {
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
    const mapelGuru = await prisma.mapelGuru.findFirst({
      where: { id_guru }
    });

    if (!mapelGuru) {
      return NextResponse.json(
        { status: false, error: "Mapel guru tidak ditemukan" },
        { status: 400 }
      );
    }

    const id_mapel = mapelGuru.id_mapel;

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
    await prisma.$transaction(
      data.map(d => {
        if (!siswaSet.has(d.nisn)) return null;

        return prisma.nilai.upsert({
          where: {
            nisn_id_mapel_id_tahun_ajaran: {
              nisn: d.nisn,
              id_mapel,
              id_tahun_ajaran: Number(id_tahun_ajaran)
            }
          },
          update: {
            nilai_angka: Number(d.nilai_angka),
            semester: Number(semester)
          },
          create: {
            nisn: d.nisn,
            id_mapel,
            id_guru,
            id_kelas: Number(id_kelas),
            id_tahun_ajaran: Number(id_tahun_ajaran),
            semester: Number(semester),
            nilai_angka: Number(d.nilai_angka)
          }
        });
      }).filter(Boolean)
    );

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

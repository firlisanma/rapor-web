import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { nisn, catatan_wali, id_tahun_ajaran, semester } =
      await req.json();

    // 1️⃣ cek rapor
    const existing = await prisma.rapor.findFirst({
      where: {
        nisn,
        id_tahun_ajaran: Number(id_tahun_ajaran),
        semester: Number(semester)
      }
    });

    if (existing) {
      // UPDATE catatan
      await prisma.rapor.update({
        where: { id_rapor: existing.id_rapor },
        data: { catatan_wali }
      });
    } else {
      // 2️⃣ ambil id_kelas dari siswa (INI KUNCI)
      const siswa = await prisma.siswa.findUnique({
        where: { nisn },
        select: { id_kelas: true }
      });

      if (!siswa) {
        return NextResponse.json(
          { error: "Siswa tidak ditemukan" },
          { status: 400 }
        );
      }

      // 3️⃣ CREATE rapor
      await prisma.rapor.create({
        data: {
          nisn,
          id_kelas: siswa.id_kelas,
          id_tahun_ajaran: Number(id_tahun_ajaran),
          semester: Number(semester),
          catatan_wali,
          status_rapor: "draft"
        }
      });
    }

    return NextResponse.json({ status: true });
  } catch (err) {
    console.error("ERROR SIMPAN CATATAN:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

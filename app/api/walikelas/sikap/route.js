import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id_kelas = searchParams.get("id_kelas");
    const id_tahun_ajaran = searchParams.get("id_tahun_ajaran");
    const semester = searchParams.get("semester");

    if (!id_kelas || !id_tahun_ajaran || !semester) {
      return NextResponse.json(
        { error: "Parameter tidak lengkap" },
        { status: 400 }
      );
    }

    // 1️⃣ ambil semua siswa di kelas wali
    const siswa = await prisma.siswa.findMany({
      where: { id_kelas: Number(id_kelas) },
      select: { nisn: true }
    });

    const nisnList = siswa.map(s => s.nisn);

    if (nisnList.length === 0) {
      return NextResponse.json({ nilai: {} });
    }

    // 2️⃣ ambil sikap berdasarkan nisn
    const data = await prisma.sikapNilai.findMany({
      where: {
        nisn: { in: nisnList },
        id_tahun_ajaran: Number(id_tahun_ajaran),
        semester: Number(semester)
      },
      select: {
        nisn: true,
        id_sikap: true,
        nilai: true
      }
    });

    // 3️⃣ mapping ke object
    const mapped = {};
    for (const d of data) {
      mapped[`${d.nisn}_${d.id_sikap}`] = d.nilai;
    }

    return NextResponse.json({ nilai: mapped });
  } catch (err) {
    console.error("ERROR PRELOAD SIKAP:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

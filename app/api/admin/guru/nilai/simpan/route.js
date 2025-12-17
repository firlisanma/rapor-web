import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("API SIMPAN NILAI KEHIT");

    const {
      nisn,
      id_mapel,
      id_guru,
      id_tahun_ajaran,
      semester,
      nilai_angka,
    } = await req.json();

    console.log("DATA MASUK:", {
      nisn,
      id_mapel,
      id_guru,
      id_tahun_ajaran,
      semester,
      nilai_angka,
    });

    if (
      !nisn ||
      !id_mapel ||
      !id_guru ||
      !id_tahun_ajaran ||
      !semester ||
      nilai_angka === undefined
    ) {
      return NextResponse.json(
        { status: false, error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const nilai = await prisma.nilai.create({
      data: {
        nisn, // CONNECT ke siswa lewat FK
        id_mapel: Number(id_mapel),
        id_guru: Number(id_guru),
        id_tahun_ajaran: Number(id_tahun_ajaran),
        semester: Number(semester),
        nilai_angka: Number(nilai_angka),
        nilai_huruf:
          nilai_angka >= 85 ? "A" :
          nilai_angka >= 75 ? "B" :
          nilai_angka >= 65 ? "C" : "D",
      },
    });

    return NextResponse.json({ status: true, nilai });
  } catch (err) {
    console.error("SIMPAN NILAI ERROR:", err);
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id_kelas = searchParams.get("id_kelas");
    const id_tahun_ajaran = searchParams.get("id_tahun_ajaran");
    const semester = searchParams.get("semester");

    console.log("PRELOAD PARAM:", {
      id_kelas,
      id_tahun_ajaran,
      semester
    });

    if (!id_kelas || !id_tahun_ajaran || !semester) {
      return NextResponse.json(
        { error: "Parameter tidak lengkap" },
        { status: 400 }
      );
    }

    const nilai = await prisma.nilai.findMany({
      where: {
        id_tahun_ajaran: Number(id_tahun_ajaran),
    semester: Number(semester),
    siswa: {
      id_kelas: Number(id_kelas),
    },
  },
  select: {
    nisn: true,
    nilai_angka: true,
  },
});

    console.log("PRELOAD DB RESULT:", nilai);

    const mapped = {};
    for (const n of nilai) {
      mapped[n.nisn] = n.nilai_angka;
    }

    return NextResponse.json({ nilai: mapped });
  } catch (err) {
    console.error("ERROR PRELOAD NILAI:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

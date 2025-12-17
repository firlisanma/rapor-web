import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id_guru = Number(searchParams.get("id_guru"));
    const id_kelas = Number(searchParams.get("id_kelas"));
    const id_tahun_ajaran = Number(searchParams.get("id_tahun_ajaran"));
    const semester = Number(searchParams.get("semester"));

    if (!id_guru || !id_kelas || !id_tahun_ajaran || !semester) {
      return NextResponse.json(
        { error: "Parameter tidak lengkap" },
        { status: 400 }
      );
    }

    const nilai = await prisma.nilai.findMany({
      where: {
        id_guru,
        id_tahun_ajaran,
        semester,
        siswa: {
          id_kelas
        }
      },
      include: {
        siswa: true,
        mapel: true
      },
      orderBy: {
        siswa: { nama_siswa: "asc" }
      }
    });

    return NextResponse.json({ nilai });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

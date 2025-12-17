import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id_kelas = searchParams.get("id_kelas");
  const id_tahun_ajaran = searchParams.get("id_tahun_ajaran");
  const semester = searchParams.get("semester");

  const siswa = await prisma.siswa.findMany({
    where: { id_kelas: Number(id_kelas) },
    select: { nisn: true }
  });

  const nisnList = siswa.map(s => s.nisn);

  const rows = await prisma.ekskulNilai.findMany({
    where: {
      nisn: { in: nisnList },
      id_tahun_ajaran: Number(id_tahun_ajaran),
      semester: Number(semester)
    }
  });

  const mapped = {};
  for (const r of rows) {
    if (!mapped[r.nisn]) mapped[r.nisn] = [];
    mapped[r.nisn].push({
      jenis_ekskul: r.jenis_ekskul,
      nilai: r.nilai
    });
  }

  return NextResponse.json({ data: mapped });
}

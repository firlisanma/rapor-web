import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id_kelas = searchParams.get("id_kelas");
  const id_tahun_ajaran = searchParams.get("id_tahun_ajaran");
  const semester = searchParams.get("semester");

  if (!id_kelas || !id_tahun_ajaran || !semester) {
    return NextResponse.json({ data: {} });
  }

  const siswa = await prisma.siswa.findMany({
    where: { id_kelas: Number(id_kelas) },
    select: { nisn: true }
  });

  const nisnList = siswa.map(s => s.nisn);

  const data = await prisma.absensiRekap.findMany({
    where: {
      nisn: { in: nisnList },
      id_tahun_ajaran: Number(id_tahun_ajaran),
      semester: Number(semester)
    }
  });

  const mapped = {};
  for (const a of data) {
    mapped[a.nisn] = {
      sakit: a.sakit ?? 0,
      izin: a.izin ?? 0,
      alpa: a.alpa ?? 0
    };
  }

  return NextResponse.json({ data: mapped });
}

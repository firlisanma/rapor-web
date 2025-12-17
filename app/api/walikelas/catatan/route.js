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

  const rapor = await prisma.rapor.findMany({
    where: {
      id_kelas: Number(id_kelas),
      id_tahun_ajaran: Number(id_tahun_ajaran),
      semester: Number(semester)
    },
    select: {
      nisn: true,
      catatan_wali: true
    }
  });

  const mapped = {};
  for (const r of rapor) {
    mapped[r.nisn] = r.catatan_wali;
  }

  return NextResponse.json({ data: mapped });
}

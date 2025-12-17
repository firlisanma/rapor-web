import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    nisn,
    sakit = 0,
    izin = 0,
    alpa = 0,
    id_tahun_ajaran,
    semester
  } = await req.json();

  const existing = await prisma.absensiRekap.findFirst({
    where: {
      nisn,
      id_tahun_ajaran: Number(id_tahun_ajaran),
      semester: Number(semester)
    }
  });

  if (existing) {
    await prisma.absensiRekap.update({
      where: { id_absensi: existing.id_absensi },
      data: { sakit, izin, alpa }
    });
  } else {
    await prisma.absensiRekap.create({
      data: {
        nisn,
        sakit,
        izin,
        alpa,
        id_tahun_ajaran: Number(id_tahun_ajaran),
        semester: Number(semester)
      }
    });
  }

  return NextResponse.json({ status: true });
}

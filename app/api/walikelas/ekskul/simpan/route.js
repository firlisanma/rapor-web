import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { nisn, jenis_ekskul, nilai, id_tahun_ajaran, semester } =
    await req.json();

  const existing = await prisma.ekskulNilai.findFirst({
    where: {
      nisn,
      jenis_ekskul,
      id_tahun_ajaran: Number(id_tahun_ajaran),
      semester: Number(semester)
    }
  });

  if (existing) {
    await prisma.ekskulNilai.update({
      where: { id_eks_nilai: existing.id_eks_nilai },
      data: { nilai }
    });
  } else {
    await prisma.ekskulNilai.create({
      data: {
        nisn,
        jenis_ekskul,
        nilai,
        id_tahun_ajaran: Number(id_tahun_ajaran),
        semester: Number(semester)
      }
    });
  }

  return NextResponse.json({ status: true });
}

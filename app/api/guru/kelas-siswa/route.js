import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id_kelas = searchParams.get("id_kelas");

  if (!id_kelas) {
    return NextResponse.json(
      { error: "id_kelas wajib" },
      { status: 400 }
    );
  }

  const siswa = await prisma.siswa.findMany({
    where: {
      id_kelas: Number(id_kelas),
      status: "Aktif",
    },
    orderBy: {
      nama_siswa: "asc",
    },
  });

  return NextResponse.json({ siswa });
}

export async function POST(req) {
  const { id_kelas } = await req.json();

  const siswa = await prisma.siswa.findMany({
    where: {
      id_kelas: Number(id_kelas),
      status: "Aktif",
    },
    orderBy: {
      nama_siswa: "asc",
    },
  });

  return NextResponse.json({ siswa });
}

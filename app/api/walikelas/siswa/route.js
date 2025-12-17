import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id_kelas = Number(searchParams.get("id_kelas"));

    if (!id_kelas) {
      return NextResponse.json({ siswa: [] });
    }

    const siswa = await prisma.siswa.findMany({
      where: { id_kelas },
      orderBy: { nama_siswa: "asc" }
    });

    return NextResponse.json({ siswa });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

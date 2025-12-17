import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const tambah = await prisma.mataPelajaran.create({
      data: {
        nama_mapel: data.nama_mapel,
        kkm: Number(data.kkm),
        kurikulum: data.kurikulum,
        kategori_mapel: data.kategori
      }
    });

    return NextResponse.json({ status: true, tambah });
  } catch (err) {
    console.error("TAMBAH MAPEL ERROR:", err);
    return NextResponse.json({ status: false, error: err.message }, { status: 500 });
  }
}

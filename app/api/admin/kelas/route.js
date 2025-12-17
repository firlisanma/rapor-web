import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET semua kelas
export async function GET() {
  try {
    const list = await prisma.kelas.findMany();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST tambah kelas
export async function POST(req) {
  try {
    const body = await req.json();
    const { nama_kelas, tingkat, jurusan } = body;

    const newKelas = await prisma.kelas.create({
      data: {
        nama_kelas,
        tingkat,
        jurusan,
      },
    });

    return NextResponse.json({ status: true, data: newKelas });
  } catch (err) {
    return NextResponse.json({ status: false, error: err.message }, { status: 500 });
  }
}

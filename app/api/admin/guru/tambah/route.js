import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const newGuru = await prisma.guru.create({
      data: {
        nama_guru: body.nama_guru,
        nip: body.nip,
        id_mapel: body.id_mapel,
        id_user: body.id_user,
      },
    });

    return NextResponse.json({ status: true, guru: newGuru });
  } catch (err) {
    console.error("TAMBAH GURU ERROR:", err);
    return NextResponse.json({ status: false, error: err.message });
  }
}

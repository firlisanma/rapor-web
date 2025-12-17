import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id_user, id_mapel, nama_guru, nip } = await req.json();

    const guru = await prisma.guru.create({
      data: {
        id_user: Number(id_user),
        id_mapel: Number(id_mapel),
        nama_guru,
        nip
      }
    });

    return NextResponse.json({ status: true, guru });
  } catch (err) {
    return NextResponse.json({ status: false, error: err.message }, { status: 500 });
  }
}

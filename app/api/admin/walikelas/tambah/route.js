import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const newWali = await prisma.walikelas.create({
      data: {
        nama_wali: body.nama_wali,
        id_user: body.id_user,
        id_kelas: body.id_kelas,
      },
    });

    return NextResponse.json({ status: true, data: newWali });
  } catch (err) {
    console.error("TAMBAH WALIKELAS ERROR:", err);
    return NextResponse.json({ status: false, error: err.message });
  }
}

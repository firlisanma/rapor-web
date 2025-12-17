import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id_user, id_kelas, nama_wali } = await req.json();

    // validasi: 1 kelas hanya boleh 1 wali
    const sudahAda = await prisma.walikelas.findFirst({
      where: { id_kelas: Number(id_kelas) }
    });

    if (sudahAda) {
      return NextResponse.json({
        status: false,
        error: "Kelas ini sudah memiliki wali kelas"
      });
    }

    const tambah = await prisma.walikelas.create({
      data: {
        id_user: Number(id_user),
        id_kelas: Number(id_kelas),
        nama_wali
      }
    });

    return NextResponse.json({ status: true, tambah });
  } catch (err) {
    return NextResponse.json({ status: false, error: err.message }, { status: 500 });
  }
}

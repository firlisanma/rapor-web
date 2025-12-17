import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.tahunAjaran.findMany({
      orderBy: { id_tahun_ajaran: "desc" }
    });
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { tahun_ajaran, semester, status } = await req.json();

    // jika set aktif → nonaktifkan yang lain
    if (status === "aktif") {
      await prisma.tahunAjaran.updateMany({
        where: { status: "aktif" },
        data: { status: "nonaktif" }
      });
    }

    const tambah = await prisma.tahunAjaran.create({
      data: { tahun_ajaran, semester, status }
    });

    return NextResponse.json({ status: true, tambah });
  } catch (e) {
    return NextResponse.json({ status: false, error: e.message }, { status: 500 });
  }
}

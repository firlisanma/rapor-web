import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id);

    const hapus = await prisma.mataPelajaran.delete({
      where: { id_mapel: id }
    });

    return NextResponse.json({ status: true });
  } catch (err) {
    console.error("DELETE MAPEL ERROR:", err);
    return NextResponse.json({ status: false, error: err.message }, { status: 500 });
  }
}

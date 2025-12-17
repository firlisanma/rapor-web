import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    // ✅ WAJIB await params
    const { id } = await context.params;
    const guruId = Number(id);

    console.log("ID GURU MASUK:", guruId);

    if (!guruId) {
      return NextResponse.json(
        { status: false, message: "ID guru tidak valid" },
        { status: 400 }
      );
    }

    // 🔎 Cek apakah guru sudah dipakai di nilai
    const dipakai = await prisma.nilai.findFirst({
      where: { id_guru: guruId },
    });

    if (dipakai) {
      return NextResponse.json(
        {
          status: false,
          message: "Guru sudah memiliki nilai, tidak bisa dihapus",
        },
        { status: 400 }
      );
    }

    // 🗑️ Hapus guru
    await prisma.guru.delete({
      where: { id_guru: guruId },
    });

    return NextResponse.json({ status: true });
  } catch (err) {
    console.error("HAPUS GURU ERROR:", err);
    return NextResponse.json(
      { status: false, message: err.message },
      { status: 500 }
    );
  }
}

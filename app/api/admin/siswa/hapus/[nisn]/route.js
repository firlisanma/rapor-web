import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    const params = await context.params;   // 🔑 WAJIB
    const nisn = params.nisn;

    await prisma.siswa.delete({
      where: { nisn }
    });

    return NextResponse.json({ status: true });
  } catch (err) {
    console.log("DELETE SISWA ERROR:", err);
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

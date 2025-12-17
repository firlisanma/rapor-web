import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const id = Number(params.id);

    await prisma.tahunAjaran.delete({
      where: { id_tahun_ajaran: id }
    });

    return NextResponse.json({ status: true });
  } catch (e) {
    return NextResponse.json({ status: false, error: e.message }, { status: 500 });
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const id = Number(params.id);

    await prisma.walikelas.delete({
      where: { id_wali: id }
    });

    return NextResponse.json({ status: true });
  } catch (err) {
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

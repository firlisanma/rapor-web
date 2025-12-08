import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const id = Number(parts.pop());

    await prisma.guru.delete({
      where: { id_guru: id }
    });

    return NextResponse.json({ status: true });
  } catch (err) {
    return NextResponse.json({ status: false, error: err.message });
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const guru = await prisma.guru.findMany({
      include: {
        user: true,
        mapel: true
      },
      orderBy: { id_guru: "asc" }
    });

    return NextResponse.json({ guru });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

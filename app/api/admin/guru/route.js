import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const list = await prisma.guru.findMany({
      include: {
        user: true,
        mapel: true,
      },
    });

    return NextResponse.json(list);
  } catch (err) {
    console.error("GET GURU ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

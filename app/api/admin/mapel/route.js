import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mapel = await prisma.mataPelajaran.findMany({
      orderBy: { id_mapel: "asc" }
    });

    return NextResponse.json({ mapel });
  } catch (err) {
    console.error("GET MAPEL ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

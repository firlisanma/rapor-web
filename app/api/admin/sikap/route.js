import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sikap = await prisma.sikap.findMany({
      orderBy: [
        { kategori_sikap: "asc" },
        { urutan: "asc" }
      ]
    });

    return NextResponse.json({ sikap });
  } catch (err) {
    console.error("ERROR GET SIKAP:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

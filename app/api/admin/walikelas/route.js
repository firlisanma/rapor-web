import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.walikelas.findMany({
      include: {
        user: true,
        kelas: true
      },
      orderBy: { id_wali: "asc" }
    });

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const kelas = await prisma.kelas.findMany({
      orderBy: [
        { tingkat: "asc" },
        { nama_kelas: "asc" },
      ],
    });

    return NextResponse.json(kelas);
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

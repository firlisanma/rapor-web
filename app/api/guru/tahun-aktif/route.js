import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const ta = await prisma.tahunAjaran.findFirst({
    where: { status: "aktif" }
  });
  return NextResponse.json({ ta });
}

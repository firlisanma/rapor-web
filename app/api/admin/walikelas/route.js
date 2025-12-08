// app/api/admin/walikelas/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const list = await prisma.waliKelas.findMany({
      include: { user: true, kelas: true }
    });
    return NextResponse.json(list); // PENTING: harus array
  } catch (err) {
    console.error("GET WALIKELAS ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

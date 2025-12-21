import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id_kelas = Number(searchParams.get("id_kelas"));
    const id_tahun_ajaran = Number(searchParams.get("id_tahun_ajaran"));
    const semester = Number(searchParams.get("semester"));

    if (!id_kelas || !id_tahun_ajaran || !semester) {
      return NextResponse.json({ data: {} });
    }

    // ambil semua siswa di kelas
    const siswa = await prisma.siswa.findMany({
      where: { id_kelas },
      select: { nisn: true }
    });

    const nisnList = siswa.map(s => s.nisn);

    if (nisnList.length === 0) {
      return NextResponse.json({ data: {} });
    }

    // ambil rapor yang sudah ada
    const rapor = await prisma.rapor.findMany({
      where: {
        nisn: { in: nisnList },
        id_tahun_ajaran,
        semester
      },
      select: {
        nisn: true,
        status_rapor: true,
        tanggal_cetak: true
      }
    });

    // mapping ke object
    const mapped = {};
    for (const r of rapor) {
      mapped[r.nisn] = {
        status_rapor: r.status_rapor ?? "draft",
        tanggal_cetak: r.tanggal_cetak
      };
    }

    return NextResponse.json({ data: mapped });
  } catch (err) {
    console.error("ERROR API WALIKELAS RAPOR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

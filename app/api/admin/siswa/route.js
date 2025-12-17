import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET semua siswa
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
  const id_kelas = searchParams.get("id_kelas");

  const siswa = await prisma.siswa.findMany({
   where: id_kelas
        ? { id_kelas: Number(id_kelas) }
        : {},
      include: {
        kelas: true
      },
      orderBy: {
        nama_siswa: "asc"
      }
});

  return NextResponse.json({ siswa });
  } catch (err) {
    console.error("GET SISWA ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST tambah siswa
export async function POST(req) {
  try {
    const data = await req.json();

    const tambah = await prisma.siswa.create({
      data: {
        nisn: data.nisn,
        nis: data.nis,
        nama_siswa: data.nama_siswa,
        gender: data.gender,
        tempat_lahir: data.tempat_lahir,
        tanggal_lahir: new Date(data.tanggal_lahir),
        alamat: data.alamat,
        ortu_wali: data.ortu_wali,
        asal_sekolah: data.asal_sekolah,
        id_kelas: Number(data.id_kelas),
        status: data.status
      }
    });

    return NextResponse.json({ status: true, tambah });
  } catch (err) {
    console.error("POST SISWA ERROR:", err);
    return NextResponse.json({ status: false, error: err.message }, { status: 500 });
  }
}

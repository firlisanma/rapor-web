import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("🔥 [SIMPAK SIKAP] ROUTE KEHIT");

  try {
    const body = await req.json();
    console.log("📥 BODY DITERIMA:", body);

    const { nisn, id_sikap, nilai, id_tahun_ajaran, semester } = body;

    if (!nisn || !id_sikap || !id_tahun_ajaran || !semester) {
      console.log("⛔ DATA TIDAK LENGKAP");
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // 🔎 CEK DATABASE AKTIF (BUKTI PAMUNGKAS)
    const dbName = await prisma.$queryRaw`SELECT DATABASE()`;
    console.log("🗄️ DATABASE AKTIF:", dbName);

    console.log("🔍 CEK DATA EXISTING DI DB...");

    const existing = await prisma.sikapNilai.findFirst({
      where: {
        nisn,
        id_sikap: Number(id_sikap),
        id_tahun_ajaran: Number(id_tahun_ajaran),
        semester: Number(semester)
      }
    });

    console.log("📌 EXISTING RESULT:", existing);

    if (existing) {
      console.log("✏️ UPDATE DATA SIKAP");

      const updated = await prisma.sikapNilai.update({
        where: { id_sikap_nilai: existing.id_sikap_nilai },
        data: { nilai }
      });

      console.log("✅ UPDATE BERHASIL:", updated);
    } else {
      console.log("➕ CREATE DATA SIKAP BARU");

      const created = await prisma.sikapNilai.create({
        data: {
          nisn,
          id_sikap: Number(id_sikap),
          nilai,
          id_tahun_ajaran: Number(id_tahun_ajaran),
          semester: Number(semester)
        }
      });

      console.log("✅ CREATE BERHASIL:", created);
    }

    console.log("🎉 PROSES SIMPAN SELESAI");
    return NextResponse.json({ status: true });

  } catch (err) {
    console.error("❌ ERROR SIMPAN SIKAP:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

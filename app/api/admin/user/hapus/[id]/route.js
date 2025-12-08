import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Robust DELETE handler that extracts the id from the request URL
 * so it doesn't depend on Next.js `params` behavior.
 */
export async function DELETE(req) {
  try {
    // Parse id dari URL (safe, tidak bergantung pada params)
    const url = new URL(req.url);
    // contoh pathname: /api/admin/user/hapus/5
    const parts = url.pathname.split("/").filter(Boolean);
    const idRaw = parts[parts.length - 1]; // segmen terakhir
    const id = Number(idRaw);

    console.log("RAW ID FROM URL:", idRaw);
    console.log("PARSED ID (Number):", id);

    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        { status: false, error: "Invalid or missing id in URL" },
        { status: 400 }
      );
    }

    // lakukan delete
    await prisma.user.delete({
      where: { id_user: id },
    });

    return NextResponse.json({ status: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);

    // jika error foreign key (dipakai di tabel lain), tangani pesan lebih ramah
    const msg = err?.message || String(err);
    if (msg.toLowerCase().includes("foreign key")) {
      return NextResponse.json(
        { status: false, error: "Gagal hapus: data masih direferensi tabel lain." },
        { status: 409 }
      );
    }

    return NextResponse.json({ status: false, error: msg }, { status: 500 });
  }
}

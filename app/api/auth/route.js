import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Cari user berdasarkan username dan password
    const user = await prisma.user.findFirst({
      where: {
        username,
        password, // nanti diganti hash
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: false, message: "Username atau password salah" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Login berhasil",
      user: {
        id_user: user.id_user,
        username: user.username,
        nama_lengkap: user.nama_lengkap,
        roleId: user.id_role,
        roleName: user.role.nama_role,
      },
    });

  } catch (error) {
    console.log("API Login ERROR:", error);
    return NextResponse.json(
      { status: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

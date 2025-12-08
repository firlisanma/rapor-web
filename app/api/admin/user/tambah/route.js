import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password, nama_lengkap, roleId } = body;

    // Insert user
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        nama_lengkap,
        id_role: roleId,
      },
    });

    return NextResponse.json(
      { status: true, user: newUser },
      { status: 201 }
    );

  } catch (err) {
    console.error("CREATE USER ERROR:", err);

    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}

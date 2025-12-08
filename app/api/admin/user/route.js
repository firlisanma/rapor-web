import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
    });

    return NextResponse.json(users);
  } catch (err) {
    console.error("GET USER ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

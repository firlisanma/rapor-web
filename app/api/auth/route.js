import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Cari user berdasarkan username dan password
    const user = await prisma.user.findFirst({
  where: {
    username,
    password,
  },
  include: {
    role: true,        //  WAJIB
    guru: true,        //  OPTIONAL (tapi kamu pakai)
    walikelas: true,   //  WAJIB untuk sikap
  },
});


//  DEBUG HARUS DI SINI (SETELAH QUERY, SEBELUM IF)
console.log("LOGIN API USER:", JSON.stringify(user, null, 2));

if (!user) {
  return NextResponse.json(
    { message: "Login gagal" },
    { status: 401 }
  );
}

return NextResponse.json({
  message: "Login berhasil",
  user,
});

let extra = {};

if (user.id_role === 2) { // GURU
  const guru = await prisma.guru.findFirst({
    where: { id_user: user.id_user },
  });

  if (!guru) {
    return NextResponse.json(
      { message: "Data guru belum dibuat oleh admin" },
      { status: 400 }
    );
  }

  extra = {
    id_guru: guru.id_guru,
    id_mapel: guru.id_mapel,
  };
}

return NextResponse.json({
  message: "Login berhasil",
  user: {
    id_user: user.id_user,
    username: user.username,
    nama_lengkap: user.nama_lengkap,
    roleId: user.id_role,
    roleName: user.role.nama_role,
    ...extra,
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

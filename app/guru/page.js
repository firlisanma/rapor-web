"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuruDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("rapor_user");

    if (!user) {
      router.replace("/login");
      return;
    }

    const data = JSON.parse(user);

    if (data.roleId !== 2) {
      router.replace("/login");
      return;
    }

    // ✅ kalau lolos semua
    setReady(true);
  }, []);

  // ⏳ jangan render apa-apa sebelum valid
  if (!ready) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard Guru</h1>
      <p style={{ color: "#555" }}>
        Selamat datang, silakan pilih menu di bawah ini.
      </p>

      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 30,
          flexWrap: "wrap"
        }}
      >
        <div style={cardStyle}>
          <h3>Input Nilai</h3>
          <p>Masukkan nilai mata pelajaran yang Anda ajar.</p>
          <button
            style={buttonStyle}
            onClick={() => router.push("/guru/nilai")}
          >
            Buka
          </button>
        </div>

        <div style={cardStyle}>
          <h3>Rekap Nilai</h3>
          <p>Lihat rekap nilai siswa per kelas.</p>
          <button
            style={buttonStyle}
            onClick={() => router.push("/guru/nilai/rekap")}
          >
            Buka
          </button>
        </div>
      </div>
    </div>
  );
}

/* ====== STYLE ====== */

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: 8,
  padding: 20,
  width: 260,
  background: "#fafafa"
};

const buttonStyle = {
  marginTop: 10,
  padding: "8px 14px",
  cursor: "pointer"
};

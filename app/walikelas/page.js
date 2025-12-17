"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WaliKelasDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("rapor_user");
    if (!user) {
      router.replace("/login");
      return;
    }

    const data = JSON.parse(user);

    // role wali kelas = 3
    if (data.roleId !== 3) {
      router.replace("/login");
      return;
    }

    setReady(true);
  }, []);

  if (!ready) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard Wali Kelas</h1>
      <p style={{ color: "#555" }}>
        Kelola data rapor siswa kelas yang Anda wali.
      </p>

      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 30,
          flexWrap: "wrap"
        }}
      >
        {/* SIKAP */}
        <div style={cardStyle}>
          <h3>Sikap</h3>
          <p>Input penilaian sikap dan kepribadian siswa.</p>
          <button
            style={buttonStyle}
            onClick={() => router.push("/walikelas/sikap")}
          >
            Buka
          </button>
        </div>

        {/* ABSENSI */}
        <div style={cardStyle}>
          <h3>Absensi</h3>
          <p>Input ketidakhadiran siswa (sakit, izin, alpa).</p>
          <button
            style={buttonStyle}
            onClick={() => router.push("/walikelas/absensi")}
          >
            Buka
          </button>
        </div>

        {/* EKSKUL */}
        <div style={cardStyle}>
          <h3>Ekstrakurikuler</h3>
          <p>Input nilai kegiatan ekstrakurikuler.</p>
          <button
            style={buttonStyle}
            onClick={() => router.push("/walikelas/ekskul")}
          >
            Buka
          </button>
        </div>

        {/* CATATAN */}
        <div style={cardStyle}>
          <h3>Catatan Wali Kelas</h3>
          <p>Isi catatan perkembangan siswa.</p>
          <button
            style={buttonStyle}
            onClick={() => router.push("/walikelas/catatan")}
          >
            Buka
          </button>
        </div>

        {/* RAPOR */}
        <div style={{ ...cardStyle, background: "#eef6ff" }}>
          <h3>Rapor</h3>
          <p>Generate dan cetak rapor siswa.</p>
          <button
            style={buttonStyle}
            onClick={() => router.push("/walikelas/rapor")}
          >
            Buka
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================
   STYLE
===================== */

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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahKelas() {
  const router = useRouter();

  const [nama_kelas, setNama] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [jurusan, setJurusan] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/admin/kelas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_kelas, tingkat, jurusan }),
    });

    router.push("/admin/kelas");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tambah Kelas</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama Kelas"
          value={nama_kelas}
          onChange={(e) => setNama(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Tingkat"
          value={tingkat}
          onChange={(e) => setTingkat(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Jurusan"
          value={jurusan}
          onChange={(e) => setJurusan(e.target.value)}
        />
        <br /><br />

        <button>Tambah</button>
      </form>
    </div>
  );
}

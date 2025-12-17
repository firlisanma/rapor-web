"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahMapel() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [kkm, setKkm] = useState("");
  const [kurikulum, setKurikulum] = useState("");
  const [kategori, setKategori] = useState("A");

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/admin/mapel/tambah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama_mapel: nama,
        kkm,
        kurikulum,
        kategori
      })
    });

    router.push("/admin/mapel");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tambah Mata Pelajaran</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama Mapel"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        /><br /><br />

        <input
          placeholder="KKM"
          type="number"
          value={kkm}
          onChange={(e) => setKkm(e.target.value)}
        /><br /><br />

        <input
          placeholder="Kurikulum"
          value={kurikulum}
          onChange={(e) => setKurikulum(e.target.value)}
        /><br /><br />

        <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
          <option value="A">Wajib (A)</option>
          <option value="B">Pilihan (B)</option>
          <option value="C">Peminatan (C)</option>
          <option value="D">Pesantren (D)</option>
        </select>
        <br /><br />

        <button>Tambah</button>
      </form>
    </div>
  );
}

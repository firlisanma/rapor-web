"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahSiswa() {
  const router = useRouter();
  const [kelas, setKelas] = useState([]);

  const [form, setForm] = useState({
    nisn: "",
    nis: "",
    nama_siswa: "",
    gender: "L",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    ortu_wali: "",
    asal_sekolah: "",
    id_kelas: "",
    status: "Aktif"
  });

  useEffect(() => {
    async function loadKelas() {
      const res = await fetch("/api/admin/kelas");
      const data = await res.json();
      setKelas(data || []);
    }
    loadKelas();
  }, []);

  function update(name, value) {
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/admin/siswa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    router.push("/admin/siswa");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tambah Siswa</h2>

      <form onSubmit={handleSubmit}>

        <input placeholder="NISN" value={form.nisn} onChange={(e) => update("nisn", e.target.value)} />
        <br /><br />

        <input placeholder="NIS" value={form.nis} onChange={(e) => update("nis", e.target.value)} />
        <br /><br />

        <input placeholder="Nama Siswa" value={form.nama_siswa} onChange={(e) => update("nama_siswa", e.target.value)} />
        <br /><br />

        <select value={form.gender} onChange={(e) => update("gender", e.target.value)}>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
        <br /><br />

        <input placeholder="Tempat Lahir" value={form.tempat_lahir} onChange={(e) => update("tempat_lahir", e.target.value)} />
        <br /><br />

        <input type="date" value={form.tanggal_lahir} onChange={(e) => update("tanggal_lahir", e.target.value)} />
        <br /><br />

        <input placeholder="Alamat" value={form.alamat} onChange={(e) => update("alamat", e.target.value)} />
        <br /><br />

        <input placeholder="Nama Orang Tua / Wali" value={form.ortu_wali} onChange={(e) => update("ortu_wali", e.target.value)} />
        <br /><br />

        <input placeholder="Asal Sekolah" value={form.asal_sekolah} onChange={(e) => update("asal_sekolah", e.target.value)} />
        <br /><br />

        <select value={form.id_kelas} onChange={(e) => update("id_kelas", e.target.value)}>
          <option value="">-- Pilih Kelas --</option>
          {kelas.map((k) => (
            <option key={k.id_kelas} value={k.id_kelas}>
              {k.nama_kelas}
            </option>
          ))}
        </select>
        <br /><br />

        <select value={form.status} onChange={(e) => update("status", e.target.value)}>
          <option value="Aktif">Aktif</option>
          <option value="Nonaktif">Nonaktif</option>
          <option value="Lulus">Lulus</option>
        </select>
        <br /><br />

        <button>Tambah</button>

      </form>
    </div>
  );
}

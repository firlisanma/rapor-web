"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahTahunAjaran() {
  const router = useRouter();
  const [form, setForm] = useState({
    tahun_ajaran: "",
    semester: 1, // default ganjil
    status: "aktif"
  });

  function set(name, val) {
    setForm({ ...form, [name]: val });
  }

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/tahunajaran", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const d = await res.json();
    if (!d.status) {
      alert(d.error);
      return;
    }

    router.push("/admin/tahunajaran");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Tambah Tahun Ajaran</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Contoh: 2024/2025"
          value={form.tahun_ajaran}
          onChange={e => set("tahun_ajaran", e.target.value)}
        />
        <br /><br />

        <select value={form.semester} onChange={e => set("semester", Number(e.target.value))}>
          <option value={1}>Ganjil</option>
          <option value={2}>Genap</option>
        </select>
        <br /><br />

        <select value={form.status} onChange={e => set("status", e.target.value)}>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
        <br /><br />

        <button>Simpan</button>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahWaliKelas() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [idUser, setIdUser] = useState("");
  const [idKelas, setIdKelas] = useState("");

  const [users, setUsers] = useState([]);
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    async function load() {
      const u = await fetch("/api/admin/user").then(r => r.json());
      const k = await fetch("/api/admin/kelas").then(r => r.json());
      setUsers(u);
      setKelas(k);
    }
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/admin/walikelas/tambah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama_wali: nama,
        id_user: Number(idUser),
        id_kelas: Number(idKelas),
      }),
    });

    router.push("/admin/walikelas");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tambah Wali Kelas</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama Wali"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <br /><br />

        <select value={idUser} onChange={(e) => setIdUser(e.target.value)}>
          <option value="">-- Pilih User --</option>
          {users.map((u) => (
            <option key={u.id_user} value={u.id_user}>
              {u.username}
            </option>
          ))}
        </select>
        <br /><br />

        <select value={idKelas} onChange={(e) => setIdKelas(e.target.value)}>
          <option value="">-- Pilih Kelas --</option>
          {kelas.map((k) => (
            <option key={k.id_kelas} value={k.id_kelas}>
              {k.nama_kelas}
            </option>
          ))}
        </select>
        <br /><br />

        <button>Tambah</button>
      </form>
    </div>
  );
}

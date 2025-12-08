"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahGuru() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [idMapel, setIdMapel] = useState("");
  const [idUser, setIdUser] = useState("");
  const [users, setUsers] = useState([]);
  const [mapel, setMapel] = useState([]);

  useEffect(() => {
    async function load() {
      const u = await fetch("/api/admin/user").then(r => r.json());
      const m = await fetch("/api/admin/mapel").then(r => r.json());
      setUsers(u);
      setMapel(m);
    }
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/admin/guru/tambah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama_guru: nama,
        nip,
        id_mapel: Number(idMapel),
        id_user: Number(idUser),
      }),
    });

    router.push("/admin/guru");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tambah Guru</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Nama Guru" value={nama} onChange={(e)=>setNama(e.target.value)} />
        <br/><br/>

        <input placeholder="NIP" value={nip} onChange={(e)=>setNip(e.target.value)} />
        <br/><br/>

        <select value={idMapel} onChange={(e)=>setIdMapel(e.target.value)}>
          <option value="">-- Pilih Mapel --</option>
          {mapel.map((m)=>(
            <option key={m.id_mapel} value={m.id_mapel}>{m.nama_mapel}</option>
          ))}
        </select>
        <br/><br/>

        <select value={idUser} onChange={(e)=>setIdUser(e.target.value)}>
          <option value="">-- Pilih User --</option>
          {users.map((u)=>(
            <option key={u.id_user} value={u.id_user}>
              {u.username}
            </option>
          ))}
        </select>
        <br/><br/>

        <button>Tambah</button>
      </form>
    </div>
  );
}

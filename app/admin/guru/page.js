"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuruPage() {
  const router = useRouter();
  const [list, setList] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/guru");
      const data = await res.json();
      setList(data);
    }
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kelola Guru</h1>

      <button
        onClick={() => router.push("/admin/guru/tambah")}
        style={{ marginBottom: "15px" }}
      >
        + Tambah Guru
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>ID Guru</th>
            <th>Nama Guru</th>
            <th>NIP</th>
            <th>Mapel</th>
            <th>Username User</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {list.map((g, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{g.id_guru}</td>
              <td>{g.nama_guru}</td>
              <td>{g.nip}</td>
              <td>{g.mapel?.nama_mapel}</td>
              <td>{g.user?.username}</td>

              <td>
                <button
                  onClick={async () => {
                    const res = await fetch(`/api/admin/guru/hapus/${g.id_guru}`, {
                      method: "DELETE",
                    });
                    const data = await res.json();
                    if (data.status) window.location.reload();
                    else alert("Gagal menghapus");
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

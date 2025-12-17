"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const kategoriMap = {
  A: "Wajib",
  B: "Pilihan",
  C: "Peminatan",
  D: "Pesantren"
};

export default function MapelPage() {
  const router = useRouter();
  const [mapel, setMapel] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/mapel");
      const data = await res.json();
      setMapel(data.mapel || []);
    }
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kelola Mata Pelajaran</h1>

      <button
        onClick={() => router.push("/admin/mapel/tambah")}
        style={{ marginBottom: "15px" }}
      >
        + Tambah Mapel
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Nama Mapel</th>
            <th>KKM</th>
            <th>Kurikulum</th>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {mapel.map((m, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{m.id_mapel}</td>
              <td>{m.nama_mapel}</td>
              <td>{m.kkm}</td>
              <td>{m.kurikulum}</td>
              <td>
                {kategoriMap[m.kategori_mapel]} ({m.kategori_mapel})
              </td>

              <td>
                <button
                  onClick={async () => {
                    const res = await fetch(`/api/admin/mapel/hapus/${m.id_mapel}`, {
                      method: "DELETE"
                    });
                    const data = await res.json();

                    if (data.status) window.location.reload();
                    else alert("Gagal hapus mapel");
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}

          {mapel.length === 0 && (
            <tr>
              <td colSpan="7">Belum ada data.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

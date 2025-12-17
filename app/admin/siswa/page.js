"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SiswaPage() {
  const router = useRouter();
  const [siswa, setSiswa] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/siswa");
      const data = await res.json();
      setSiswa(data.siswa || []);
    }
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kelola Siswa</h1>

      <button
        onClick={() => router.push("/admin/siswa/tambah")}
        style={{ marginBottom: "15px" }}
      >
        + Tambah Siswa
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>NISN</th>
            <th>NIS</th>
            <th>Nama</th>
            <th>Gender</th>
            <th>Kelas</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {siswa.map((s, i) => (
            <tr key={s.nisn}>
              <td>{i + 1}</td>
              <td>{s.nisn}</td>
              <td>{s.nis}</td>
              <td>{s.nama_siswa}</td>
              <td>{s.gender}</td>
              <td>{s.kelas?.nama_kelas}</td>
              <td>{s.status}</td>

              <td>  
                <button
                  onClick={async () => {
                    const res = await fetch(`/api/admin/siswa/hapus/${s.nisn}`, {
                      method: "DELETE"
                    });
                    const d = await res.json();

                    if (d.status) window.location.reload();
                    else alert("Gagal hapus siswa");
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}

          {siswa.length === 0 && (
            <tr>
              <td colSpan="8">Belum ada data siswa.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

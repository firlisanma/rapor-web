"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RaporWaliKelas() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [siswa, setSiswa] = useState([]);
  const [rapor, setRapor] = useState({});
  const [ta, setTa] = useState(null);
  const [loadingNisn, setLoadingNisn] = useState(null);

  useEffect(() => {
    async function init() {
      const user = JSON.parse(localStorage.getItem("rapor_user"));
      if (!user || user.roleId !== 3) {
        router.replace("/login");
        return;
      }

      // tahun ajaran aktif
      const taRes = await fetch("/api/guru/tahun-aktif");
      const taData = await taRes.json();
      setTa(taData.ta);

      // siswa wali kelas
      const sRes = await fetch(
        `/api/walikelas/siswa?id_kelas=${user.id_kelas}`
      );
      const sData = await sRes.json();
      setSiswa(sData.siswa || []);

      // status rapor
      const rRes = await fetch(
        `/api/walikelas/rapor?id_kelas=${user.id_kelas}&id_tahun_ajaran=${taData.ta.id_tahun_ajaran}&semester=${taData.ta.semester}`
      );
      const rData = await rRes.json();
      setRapor(rData.data || {});

      setReady(true);
    }

    init();
  }, []);

  async function generateRapor(nisn) {
    try {
      if (!ta) {
        alert("Tahun ajaran belum siap");
        return;
      }

      setLoadingNisn(nisn);

      const res = await fetch("/api/rapor/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nisn,
          id_tahun_ajaran: ta.id_tahun_ajaran,
          semester: ta.semester
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Gagal generate PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `rapor-${nisn}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingNisn(null);
    }
  }

  if (!ready) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Rapor Siswa</h1>
      <p style={{ color: "#555" }}>
        Generate dan finalisasi rapor siswa per semester.
      </p>

      <table
        border="1"
        cellPadding="8"
        style={{ marginTop: 20, width: "100%" }}
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Siswa</th>
            <th>Status Rapor</th>
            <th>Tanggal Cetak</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((s, i) => {
            const r = rapor[s.nisn];

            return (
              <tr key={s.nisn}>
                <td>{i + 1}</td>
                <td>{s.nama_siswa}</td>
                <td>{r?.status_rapor ?? "draft"}</td>
                <td>
                  {r?.tanggal_cetak
                    ? new Date(r.tanggal_cetak).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button
                    onClick={() => generateRapor(s.nisn)}
                    disabled={loadingNisn === s.nisn}
                  >
                    {loadingNisn === s.nisn
                      ? "Generating..."
                      : "Generate"}
                  </button>

                  <button
                    style={{ marginLeft: 10 }}
                    disabled={r?.status_rapor === "final"}
                    onClick={() =>
                      alert("Finalisasi rapor (step berikutnya)")
                    }
                  >
                    Finalkan
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function AbsensiWaliKelas() {
  const [siswa, setSiswa] = useState([]);
  const [ta, setTa] = useState(null);
  const [absensi, setAbsensi] = useState({});

  useEffect(() => {
    async function init() {
      const taRes = await fetch("/api/guru/tahun-aktif");
      const taData = await taRes.json();
      setTa(taData.ta);

      const user = JSON.parse(localStorage.getItem("rapor_user"));

      const sRes = await fetch(
        `/api/walikelas/siswa?id_kelas=${user.id_kelas}`
      );
      const sData = await sRes.json();
      setSiswa(sData.siswa || []);

      // preload absensi
      const aRes = await fetch(
        `/api/walikelas/absensi?id_kelas=${user.id_kelas}&id_tahun_ajaran=${taData.ta.id_tahun_ajaran}&semester=${taData.ta.semester}`
      );
      const aData = await aRes.json();
      setAbsensi(aData.data || {});
    }

    init();
  }, []);

  function ubah(nisn, field, value) {
    setAbsensi(prev => ({
      ...prev,
      [nisn]: {
        ...prev[nisn],
        [field]: Number(value)
      }
    }));
  }

  async function simpan() {
    if (!ta) return;

    for (const [nisn, data] of Object.entries(absensi)) {
      await fetch("/api/walikelas/absensi/simpan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nisn,
          sakit: data.sakit ?? 0,
          izin: data.izin ?? 0,
          alpa: data.alpa ?? 0,
          id_tahun_ajaran: ta.id_tahun_ajaran,
          semester: ta.semester
        })
      });
    }

    alert("Absensi berhasil disimpan");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Ketidakhadiran Siswa</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Sakit</th>
            <th>Izin</th>
            <th>Tanpa Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {siswa.map((s, i) => (
            <tr key={s.nisn}>
              <td>{i + 1}</td>
              <td>{s.nama_siswa}</td>

              {["sakit", "izin", "alpa"].map(f => (
                <td key={f}>
                  <input
                    type="number"
                    min="0"
                    value={absensi[s.nisn]?.[f] ?? 0}
                    onChange={e => ubah(s.nisn, f, e.target.value)}
                    style={{ width: 60 }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={simpan}>Simpan Absensi</button>
    </div>
  );
}

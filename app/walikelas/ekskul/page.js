"use client";

import { useEffect, useState } from "react";

export default function EkskulWaliKelas() {
  const [siswa, setSiswa] = useState([]);
  const [ta, setTa] = useState(null);
  const [data, setData] = useState({});

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

      const eRes = await fetch(
        `/api/walikelas/ekskul?id_kelas=${user.id_kelas}&id_tahun_ajaran=${taData.ta.id_tahun_ajaran}&semester=${taData.ta.semester}`
      );
      const eData = await eRes.json();
      setData(eData.data || {});
    }

    init();
  }, []);

  function ubah(nisn, idx, field, value) {
    setData(prev => {
      const rows = prev[nisn] ?? [];
      rows[idx] = { ...rows[idx], [field]: value };
      return { ...prev, [nisn]: rows };
    });
  }

  async function simpan() {
    for (const [nisn, rows] of Object.entries(data)) {
      for (const r of rows) {
        if (!r?.jenis_ekskul) continue;

        await fetch("/api/walikelas/ekskul/simpan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nisn,
            jenis_ekskul: r.jenis_ekskul,
            nilai: r.nilai,
            id_tahun_ajaran: ta.id_tahun_ajaran,
            semester: ta.semester
          })
        });
      }
    }

    alert("Nilai ekskul berhasil disimpan");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Kegiatan Ekstrakurikuler</h2>

      {siswa.map((s, i) => (
        <div key={s.nisn} style={{ marginBottom: 30 }}>
          <strong>{i + 1}. {s.nama_siswa}</strong>

          {[0, 1, 2, 3].map(idx => (
            <div key={idx} style={{ display: "flex", gap: 10, marginTop: 5 }}>
              <input
                placeholder="Jenis kegiatan"
                value={data[s.nisn]?.[idx]?.jenis_ekskul ?? ""}
                onChange={e =>
                  ubah(s.nisn, idx, "jenis_ekskul", e.target.value)
                }
              />
              <select
                value={data[s.nisn]?.[idx]?.nilai ?? ""}
                onChange={e =>
                  ubah(s.nisn, idx, "nilai", e.target.value)
                }
              >
                <option value="">-</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          ))}
        </div>
      ))}

      <button onClick={simpan}>Simpan Ekskul</button>
    </div>
  );
}

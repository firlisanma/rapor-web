"use client";
import { useEffect, useState } from "react";

export default function RekapNilaiGuru() {
  const [kelasId, setKelasId] = useState("");
  const [kelas, setKelas] = useState([]);
  const [ta, setTa] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const resTA = await fetch("/api/guru/tahun-aktif");
      const dTA = await resTA.json();
      setTa(dTA.ta);

      const resKelas = await fetch("/api/guru/kelas");
      const dKelas = await resKelas.json();
      setKelas(dKelas);
    }
    init();
  }, []);

  async function loadRekap() {
    const user = JSON.parse(localStorage.getItem("rapor_user"));
    if (!kelasId || !ta || !user) {
      alert("Data belum lengkap");
      return;
    }

    setLoading(true);

    const res = await fetch(
      `/api/guru/nilai/rekap?id_guru=${user.id_guru}&id_kelas=${kelasId}&id_tahun_ajaran=${ta.id_tahun_ajaran}&semester=${ta.semester}`
    );

    const json = await res.json();
    setData(json.nilai || []);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Rekap Nilai Guru</h1>

      {ta && (
        <p>
          Tahun Ajaran: {ta.tahun_ajaran} (
          {ta.semester === 1 ? "Ganjil" : "Genap"})
        </p>
      )}

      <label>Pilih Kelas</label><br />
      <select value={kelasId} onChange={e => setKelasId(e.target.value)}>
        <option value="">-- Pilih Kelas --</option>
        {kelas.map(k => (
          <option key={k.id_kelas} value={k.id_kelas}>
            {k.nama_kelas}
          </option>
        ))}
      </select>

      <br /><br />
      <button onClick={loadRekap} disabled={loading}>
        {loading ? "Loading..." : "Tampilkan Rekap"}
      </button>

      {data.length > 0 && (
        <>
          <br /><br />
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>No</th>
                <th>NISN</th>
                <th>Nama</th>
                <th>Mapel</th>
                <th>Nilai</th>
              </tr>
            </thead>
            <tbody>
              {data.map((n, i) => (
                <tr key={n.id_nilai}>
                  <td>{i + 1}</td>
                  <td>{n.siswa.nisn}</td>
                  <td>{n.siswa.nama_siswa}</td>
                  <td>{n.mapel.nama_mapel}</td>
                  <td>{n.nilai_angka}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ambilDaftarMahasiswa, hapusMahasiswa } from '../api/layananMahasiswa'
import { pesanGalat } from '../api/galat'

export default function DaftarMahasiswa() {
  const [daftar, setDaftar] = useState([])
  const [meta, setMeta] = useState(null)
  const [halaman, setHalaman] = useState(1)
  const [cari, setCari] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const [pesan, setPesan] = useState('')
  const [versi, setVersi] = useState(0)
  const [idMenghapus, setIdMenghapus] = useState(null)

  useEffect(() => {
    let dibatalkan = false

    async function muatData() {
      setSedangMemuat(true)
      setPesan('')

      try {
        const hasil = await ambilDaftarMahasiswa({
          page: halaman,
          cari: cari,
          per_halaman: 10,
        })

        if (dibatalkan === false) {
          setDaftar(hasil.data)
          setMeta(hasil.meta)
        }
      } catch (galat) {
        if (dibatalkan === false) {
          setPesan(pesanGalat(galat, 'Gagal memuat data mahasiswa'))
        }
      } finally {
        if (dibatalkan === false) {
          setSedangMemuat(false)
        }
      }
    }

    // Debounce: menunda permintaan 400 ms setelah ketukan terakhir.
    const penunda = setTimeout(muatData, 400)

    return () => {
      dibatalkan = true
      clearTimeout(penunda)
    }
  }, [halaman, cari, versi])

  const muatUlang = useCallback(() => {
    setVersi((nilai) => nilai + 1)
  }, [])

  async function tanganiHapus(mahasiswa) {
    const yakin = window.confirm(
      `Hapus data mahasiswa ${mahasiswa.nama} (${mahasiswa.nim})?`
    )

    if (!yakin) {
      return
    }

    setIdMenghapus(mahasiswa.id)
    setPesan('')

    try {
      await hapusMahasiswa(mahasiswa.id)

      // Jika baris terakhir pada halaman ini dihapus, mundur satu halaman.
      if (daftar.length === 1 && halaman > 1) {
        setHalaman(halaman - 1)
      } else {
        muatUlang()
      }
    } catch (galat) {
      setPesan(pesanGalat(galat, 'Gagal menghapus data mahasiswa'))
    } finally {
      setIdMenghapus(null)
    }
  }

  return (
    <section>
      <div className="judul-halaman">
        <div>
          <p className="label-kecil">Data akademik</p>
          <h1>Daftar Mahasiswa</h1>
        </div>

        <Link className="tombol-utama" to="/mahasiswa/tambah">
          + Tambah Mahasiswa
        </Link>
      </div>

      <div className="bilah-alat">
        <input
          type="search"
          placeholder="Cari nama atau NIM..."
          value={cari}
          onChange={(peristiwa) => {
            setHalaman(1)
            setCari(peristiwa.target.value)
          }}
        />

        {meta && (
          <span className="teks-redup">
            {meta.total} data ditemukan
          </span>
        )}
      </div>

      {pesan && <p className="peringatan">{pesan}</p>}
      {sedangMemuat && <p className="teks-redup">Memuat data...</p>}

      {sedangMemuat === false && daftar.length === 0 && (
        <p className="kotak-kosong">Data tidak ditemukan.</p>
      )}

      {daftar.length > 0 && (
        <div className="wadah-tabel">
          <table>
            <thead>
              <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Program Studi</th>
                <th>Angkatan</th>
                <th>IPK</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftar.map((mahasiswa) => (
                <tr key={mahasiswa.id}>
                  <td className="mono">{mahasiswa.nim}</td>
                  <td>{mahasiswa.nama}</td>
                  <td>{mahasiswa.program_studi?.nama || '-'}</td>
                  <td>{mahasiswa.angkatan}</td>
                  <td>{Number(mahasiswa.ipk).toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className="tombol-hapus"
                      onClick={() => tanganiHapus(mahasiswa)}
                      disabled={idMenghapus === mahasiswa.id}
                    >
                      {idMenghapus === mahasiswa.id ? 'Menghapus...' : 'Hapus'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && (
        <div className="paginasi">
          <button
            type="button"
            onClick={() => setHalaman(halaman - 1)}
            disabled={halaman <= 1 || sedangMemuat}
          >
            Sebelumnya
          </button>

          <span>
            Halaman {meta.current_page} dari {meta.last_page}
          </span>

          <button
            type="button"
            onClick={() => setHalaman(halaman + 1)}
            disabled={meta.current_page >= meta.last_page || sedangMemuat}
          >
            Berikutnya
          </button>
        </div>
      )}
    </section>
  )
}

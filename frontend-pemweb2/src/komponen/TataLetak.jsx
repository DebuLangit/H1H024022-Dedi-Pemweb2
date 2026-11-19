import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ambilProfil, logout } from '../api/layananAuth'
import { targetBackend } from '../api/klien'

export default function TataLetak() {
  const [profil, setProfil] = useState(null)
  const [sedangKeluar, setSedangKeluar] = useState(false)
  const navigasi = useNavigate()

  useEffect(() => {
    let dibatalkan = false

    async function muatProfil() {
      try {
        const hasil = await ambilProfil()

        if (dibatalkan === false) {
          setProfil(hasil.data)
        }
      } catch {
        // Interceptor sudah menangani token kedaluwarsa.
      }
    }

    muatProfil()

    return () => {
      dibatalkan = true
    }
  }, [])

  async function tanganiKeluar() {
    setSedangKeluar(true)

    try {
      await logout()
    } catch {
      // Token mungkin sudah tidak berlaku; sesi lokal tetap dibersihkan.
    } finally {
      sessionStorage.removeItem('token')
      navigasi('/login')
    }
  }

  return (
    <div className="aplikasi">
      <header className="bilah-atas">
        <Link to="/mahasiswa" className="merek">
          <span className="logo-merek">PW</span>
          <span>
            <strong>Pemweb II</strong>
            <small>Integrasi Backend &amp; Frontend</small>
          </span>
        </Link>

        <div className="info-pengguna">
          <span className="lencana-backend">
            {targetBackend === 'fiber' ? 'Fiber' : 'Laravel'}
          </span>

          {profil && (
            <span className="teks-redup">
              {profil.nama} · {profil.peran}
            </span>
          )}

          <button
            type="button"
            className="tombol-sekunder"
            onClick={tanganiKeluar}
            disabled={sedangKeluar}
          >
            {sedangKeluar ? 'Keluar...' : 'Keluar'}
          </button>
        </div>
      </header>

      <main className="isi-aplikasi">
        <Outlet />
      </main>
    </div>
  )
}

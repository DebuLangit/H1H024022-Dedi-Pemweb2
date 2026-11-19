import klien from '../klien'

// Adapter Fiber: perbedaan kontrak yang ditangani di sini adalah
// kata_sandi (bukan password), halaman (bukan page), dan
// meta.total_halaman (bukan meta.last_page).
const fiber = {
  nama: 'Fiber',

  async login(email, kataSandi) {
    const respons = await klien.post('/auth/login', {
      email,
      kata_sandi: kataSandi,
    })

    return respons.data
  },

  async ambilProfil() {
    const respons = await klien.get('/auth/profil')

    return respons.data
  },

  async logout() {
    const respons = await klien.post('/auth/logout')

    return respons.data
  },

  async ambilDaftarMahasiswa({ page = 1, cari = '', per_halaman = 10 }) {
    const respons = await klien.get('/mahasiswa', {
      params: { halaman: page, cari, per_halaman },
    })

    const hasil = respons.data
    const meta = hasil.meta || {}

    return {
      data: hasil.data || [],
      meta: {
        current_page: meta.halaman || page,
        last_page: meta.total_halaman || 1,
        total: meta.total || (hasil.data ? hasil.data.length : 0),
      },
    }
  },

  async ambilDetailMahasiswa(id) {
    const respons = await klien.get(`/mahasiswa/${id}`)

    return respons.data.data
  },

  async simpanMahasiswa(data) {
    const respons = await klien.post('/mahasiswa', data)

    return respons.data
  },

  async hapusMahasiswa(id) {
    const respons = await klien.delete(`/mahasiswa/${id}`)

    return respons.data
  },

  async ambilProgramStudi() {
    const respons = await klien.get('/program-studi')

    return respons.data.data
  },
}

export default fiber

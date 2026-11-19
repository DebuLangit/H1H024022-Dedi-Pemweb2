import klien from '../klien'

// Adapter Laravel: menyesuaikan bentuk respons Laravel (meta.current_page,
// meta.last_page, password) menjadi kontrak internal aplikasi.
const laravel = {
  nama: 'Laravel',

  async login(email, kataSandi) {
    const respons = await klien.post('/auth/login', {
      email,
      password: kataSandi,
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
      params: { page, cari, per_halaman },
    })

    const hasil = respons.data
    const meta = hasil.meta || {}

    return {
      data: hasil.data,
      meta: {
        current_page: meta.current_page || page,
        last_page: meta.last_page || 1,
        total: meta.total || hasil.data.length,
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

export default laravel

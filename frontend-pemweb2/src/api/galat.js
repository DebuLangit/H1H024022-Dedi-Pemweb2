const PETA_FIELD_FIBER = {
  ProgramStudiID: 'program_studi_id',
  Nim: 'nim',
  Nama: 'nama',
  Email: 'email',
  Angkatan: 'angkatan',
  Ipk: 'ipk',
  Aktif: 'aktif',
  KataSandi: 'kata_sandi',
}

export function pesanGalat(galat, pesanBawaan = 'Terjadi kesalahan') {
  if (!galat.response) {
    return 'Tidak dapat menghubungi server'
  }

  const data = galat.response.data || {}

  return data.pesan || data.message || pesanBawaan
}

// Mengubah galat validasi kedua backend menjadi bentuk { nama_field: pesan }.
export function galatValidasi(galat) {
  if (!galat.response || galat.response.status !== 422) {
    return {}
  }

  const data = galat.response.data || {}
  const hasil = {}

  if (data.errors && typeof data.errors === 'object') {
    Object.entries(data.errors).forEach(([field, daftarPesan]) => {
      hasil[field] = Array.isArray(daftarPesan) ? daftarPesan[0] : String(daftarPesan)
    })

    return hasil
  }

  if (data.galat && !Array.isArray(data.galat) && typeof data.galat === 'object') {
    Object.entries(data.galat).forEach(([field, daftarPesan]) => {
      hasil[field] = Array.isArray(daftarPesan) ? daftarPesan[0] : String(daftarPesan)
    })

    return hasil
  }

  if (Array.isArray(data.galat)) {
    data.galat.forEach((item) => {
      const field = PETA_FIELD_FIBER[item.field] || item.field
      hasil[field] = item.pesan
    })
  }

  return hasil
}

import backend from './backend'

export async function ambilDaftarMahasiswa(parameter) {
  return backend.ambilDaftarMahasiswa(parameter)
}

export async function ambilDetailMahasiswa(id) {
  return backend.ambilDetailMahasiswa(id)
}

export async function simpanMahasiswa(data) {
  return backend.simpanMahasiswa(data)
}

export async function hapusMahasiswa(id) {
  return backend.hapusMahasiswa(id)
}

export async function ambilProgramStudi() {
  return backend.ambilProgramStudi()
}

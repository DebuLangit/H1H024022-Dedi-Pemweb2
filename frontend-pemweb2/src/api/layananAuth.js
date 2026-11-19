import backend from './backend'

export async function login(email, kataSandi) {
  return backend.login(email, kataSandi)
}

export async function ambilProfil() {
  return backend.ambilProfil()
}

export async function logout() {
  return backend.logout()
}

package config

import (
	"log"

	"golang.org/x/crypto/bcrypt"

	"latihan-fiber-api/internal/model"
)

func Migrasi() {
	err := DB.AutoMigrate(
		&model.ProgramStudi{},
		&model.Mahasiswa{},
		&model.Matakuliah{},
		&model.Pengguna{},
		&model.DaftarHitamToken{},
	)
	if err != nil {
		log.Fatal("Gagal menjalankan migrasi: ", err)
	}

	log.Println("Migrasi selesai")
}

func DataAwal() {
	var jumlah int64

	DB.Model(&model.ProgramStudi{}).Count(&jumlah)

	if jumlah == 0 {
		daftar := []model.ProgramStudi{
			{Kode: "TK", Nama: "Teknik Komputer", Jenjang: "S1"},
			{Kode: "IF", Nama: "Informatika", Jenjang: "S1"},
			{Kode: "TE", Nama: "Teknik Elektro", Jenjang: "S1"},
		}

		DB.Create(&daftar)
		log.Println("Data awal program studi dibuat")
	}

	var jumlahMk int64
	DB.Model(&model.Matakuliah{}).Count(&jumlahMk)
	if jumlahMk == 0 {
		daftarMk := []model.Matakuliah{
			{Kode: "TK101", Nama: "Pemrograman Web II", Sks: 3, Semester: 5},
			{Kode: "TK102", Nama: "Jaringan Komputer", Sks: 3, Semester: 5},
			{Kode: "TK103", Nama: "Sistem Komputer", Sks: 3, Semester: 3},
		}

		DB.Create(&daftarMk)
		log.Println("Data awal matakuliah dibuat")
	}

	var jumlahPengguna int64
	DB.Model(&model.Pengguna{}).Count(&jumlahPengguna)

	// Pastikan akun demo tersedia, termasuk ketika tabel sudah berisi data lain.
	daftarPengguna := []struct {
		Nama      string
		Email     string
		KataSandi string
		Peran     string
	}{
		{"Administrator", "admin@example.com", "admin123", "admin"},
		{"Dosen Pengampu", "dosen@example.com", "dosen123", "dosen"},
		{"Mahasiswa Contoh", "mahasiswa@example.com", "mahasiswa123", "mahasiswa"},
	}

	for _, item := range daftarPengguna {
		var pengguna model.Pengguna
		err := DB.Where("email = ?", item.Email).First(&pengguna).Error
		if err == nil {
			continue
		}

		hash, _ := bcrypt.GenerateFromPassword([]byte(item.KataSandi), bcrypt.DefaultCost)
		DB.Create(&model.Pengguna{
			Nama:      item.Nama,
			Email:     item.Email,
			KataSandi: string(hash),
			Peran:     item.Peran,
		})
	}

	if jumlahPengguna == 0 {
		log.Println("Data awal pengguna dibuat")
	}
}

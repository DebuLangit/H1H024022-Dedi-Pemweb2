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
	if jumlahPengguna == 0 {
		hashAdmin, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
		hashDosen, _ := bcrypt.GenerateFromPassword([]byte("dosen123"), bcrypt.DefaultCost)
		hashMhs, _ := bcrypt.GenerateFromPassword([]byte("mahasiswa123"), bcrypt.DefaultCost)

		daftarPengguna := []model.Pengguna{
			{Nama: "Administrator", Email: "admin@example.com", KataSandi: string(hashAdmin), Peran: "admin"},
			{Nama: "Dosen Pengampu", Email: "dosen@example.com", KataSandi: string(hashDosen), Peran: "dosen"},
			{Nama: "Mahasiswa Contoh", Email: "mahasiswa@example.com", KataSandi: string(hashMhs), Peran: "mahasiswa"},
		}

		DB.Create(&daftarPengguna)
		log.Println("Data awal pengguna dibuat")
	}
}

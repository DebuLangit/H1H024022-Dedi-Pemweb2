package repository

import (
	"latihan-fiber-api/internal/config"
	"latihan-fiber-api/internal/model"
)

type ProgramStudiDenganJumlah struct {
	ID              uint   `json:"id"`
	Kode            string `json:"kode"`
	Nama            string `json:"nama"`
	Jenjang         string `json:"jenjang"`
	JumlahMahasiswa int64  `json:"jumlah_mahasiswa"`
}

func AmbilSemuaProgramStudiDenganJumlah() ([]ProgramStudiDenganJumlah, error) {
	var daftarProdi []model.ProgramStudi

	err := config.DB.Order("kode ASC").Find(&daftarProdi).Error
	if err != nil {
		return nil, err
	}

	var hasil []ProgramStudiDenganJumlah

	for _, prodi := range daftarProdi {
		var jumlah int64

		err := config.DB.Model(&model.Mahasiswa{}).
			Where("program_studi_id = ?", prodi.ID).
			Count(&jumlah).Error

		if err != nil {
			return nil, err
		}

		hasil = append(hasil, ProgramStudiDenganJumlah{
			ID:              prodi.ID,
			Kode:            prodi.Kode,
			Nama:            prodi.Nama,
			Jenjang:         prodi.Jenjang,
			JumlahMahasiswa: jumlah,
		})
	}

	return hasil, nil
}

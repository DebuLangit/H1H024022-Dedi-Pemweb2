package validasi_test

import (
	"testing"

	"latihan-fiber-api/internal/validasi"
)

type contohDto struct {
	Nim string `validate:"required,min=5,max=20,nim_h"`
}

func TestValidasiNimH(t *testing.T) {
	suksesCases := []string{"H1H024022", "H1D021001", "H12345", "H1A020001"}
	for _, nim := range suksesCases {
		data := contohDto{Nim: nim}
		galat := validasi.Periksa(data)
		if len(galat) > 0 {
			t.Errorf("NIM %s seharusnya valid, tapi mendapat galat: %v", nim, galat)
		}
	}

	gagalCases := []string{"A12345", "123456", "HABCDE", "H-12345"}
	for _, nim := range gagalCases {
		data := contohDto{Nim: nim}
		galat := validasi.Periksa(data)
		if len(galat) == 0 {
			t.Errorf("NIM %s seharusnya tidak valid, tapi lolos validasi", nim)
		}
	}
}


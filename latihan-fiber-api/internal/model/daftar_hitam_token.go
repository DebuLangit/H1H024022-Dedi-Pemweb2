package model

import "time"

type DaftarHitamToken struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Token     string    `gorm:"type:varchar(500);index;not null" json:"token"`
	CreatedAt time.Time `json:"dibuat_pada"`
}


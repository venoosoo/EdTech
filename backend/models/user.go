package models

import "time"

type User struct {
	ID        uint      `gorm:"primaryKey"`
	Login     string    `gorm:"not null;unique"`
	Password  string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"not null"`
	Token     string    `gorm:"size:64;uniqueIndex"`
}

type RegisterRequest struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

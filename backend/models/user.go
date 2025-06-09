package models

import "time"

type User struct {
	ID        uint      `gorm:"primaryKey"`
	Login     string    `gorm:"not null;unique"`
	Password  string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"not null"`
	Token     string    `gorm:"size:64;uniqueIndex"`
	Average_grade int `gorm:"not null"`
	Class int `gorm:"not null"`
}

type RegisterRequest struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}


type Grade struct {
	Grade uint `gorm:"not null"`
	User_id uint `gorm:"not null"`
	Subject_id uint `gorm:"not null"`
	Grade_id uint `gorm:"primaryKey"`
	time_placed time.Time `gorm:"not null"`
}

package me

import (
	"net/http"
	"gorm.io/gorm"
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"backend/models"
	"fmt"

)

func MeHandler(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	cookie, err := r.Cookie("token")

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	username, err := r.Cookie("username")
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return

	}
	var user models.User

	result := db.Where("login = ?", username.Value).First(&user)
	if result.Error != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	token := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(cookie.Value))
	fmt.Println(token)
  if token != nil {
		http.Error(w, "No token", http.StatusUnauthorized)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{} {
		"id": user.ID,
		"login": user.Login,
	})

}

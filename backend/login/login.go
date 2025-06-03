
package login

import (
	"net/http"
	"encoding/json"
	"backend/authenticateUser"
	"gorm.io/gorm"
	"backend/replaceToken"
	"strconv"

)


type RegisterRequest struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

func Login(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if req.Login == "" || req.Password == "" {
		http.Error(w, "Login and password required", http.StatusBadRequest)
		return
	}
  
	user, err := auth.AuthenticateUser(req.Login, req.Password, db)
	if err != nil {
		http.Error(w, "Failed to get user", http.StatusUnauthorized)
		return
	}
	
	newToken, err := replace.ReplaceToken(user, db)
 	if err != nil {
		http.Error(w, "Failed to update token", http.StatusInternalServerError)
		return
	}

	cookie := http.Cookie{
		Name:     "token",
		Value:    newToken,
		HttpOnly: true,
		Path:     "/",
		Secure:   false, // set to true if using HTTPS
		SameSite: http.SameSiteLaxMode,
		MaxAge:   60 * 60 * 24 * 7, // 1 week
	}

	cookie2 := http.Cookie{
		Name:     "username",
		Value:    user.Login,
		HttpOnly: true,
		Path:     "/",
		Secure:   false, // set to true if using HTTPS
		SameSite: http.SameSiteLaxMode,
		MaxAge:   60 * 60 * 24 * 7, // 1 week
	}

	cookie3 := http.Cookie{
		Name:     "id",
		Value:    strconv.FormatUint(uint64(user.ID), 10),
		HttpOnly: true,
		Path:     "/",
		Secure:   false, // set to true if using HTTPS
		SameSite: http.SameSiteLaxMode,
		MaxAge:   60 * 60 * 24 * 7, // 1 week
	}


	http.SetCookie(w, &cookie)
	http.SetCookie(w, &cookie2)
	http.SetCookie(w, &cookie3)


	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "User registered",
		"user_id": user.ID,
	})
  
}


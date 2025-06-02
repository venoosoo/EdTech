package register


import (
	"net/http"
	"encoding/json"
	"backend/security"
	"gorm.io/gorm"
	"backend/models"
	"time"
)



func Register(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}
	
	if req.Login == "" || req.Password == "" {
		http.Error(w, "Login and password required", http.StatusBadRequest)
		return
	}

	hashedPassword, err := security.Hashing(req.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Generate token (will send plain token in cookie, hash stored in DB)
	token, err := security.GenerateSecureToken()
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	hashedToken, err := security.Hashing(token)
	if err != nil {
		http.Error(w, "Failed to hash token", http.StatusInternalServerError)
		return
	}

	user := models.User{
		Login:     req.Login,
		Password:  hashedPassword,
		CreatedAt: time.Now(),
		Token:     hashedToken,
	}

	result := db.Create(&user)
	if result.Error != nil {
		http.Error(w, "Could not create user: "+result.Error.Error(), http.StatusInternalServerError)
		return
	}

	cookie := http.Cookie{
		Name:     "token",
		Value:    token,
		HttpOnly: true,
		Path:     "/",
		Secure:   false, 
		SameSite: http.SameSiteLaxMode,
		MaxAge:   60 * 60 * 24 * 7, 
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


	http.SetCookie(w, &cookie)
	http.SetCookie(w, &cookie2)

	// Response
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "User registered",
		"user_id": user.ID,
	})
}


package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"crypto/rand"
	"encoding/hex"
	"github.com/gorilla/handlers"  // Import the CORS package
)

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

var db *gorm.DB

func main() {
	err := godotenv.Load("./data.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db = connectToDB()

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Error getting database instance:", err)
	}
	defer sqlDB.Close()

	err = db.AutoMigrate(&User{})
	if err != nil {
		log.Fatal("Error migrating schema:", err)
	}

	// Set up CORS configuration
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:3000"}) // Allow frontend from localhost:3000
	methods := handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS", "PUT", "DELETE"})
	credentials := handlers.AllowCredentials()

	// Register routes
	http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/me", meHandler)
	http.HandleFunc("/logout", logoutHandler)

	// Start the server with CORS enabled
	fmt.Println("Server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(origins, headers, methods, credentials)(http.DefaultServeMux)))
}


func logoutHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	cookie := &http.Cookie{
        Name:     "token",
        Value:    "",
        Path:     "/",
        Expires:  time.Unix(0, 0),
        MaxAge:   -1,
        HttpOnly: true,
        Secure:    false,
        SameSite: http.SameSiteLaxMode,
    }

    http.SetCookie(w, cookie)
    w.Write([]byte("Cookie deleted"))

		cookie2 := &http.Cookie{
			Name:     "username",
        Value:    "",
        Path:     "/",
        Expires:  time.Unix(0, 0),
        MaxAge:   -1,
        HttpOnly: true,
        Secure:   true,
        SameSite: http.SameSiteLaxMode,
    }

    http.SetCookie(w, cookie2)
    w.Write([]byte("Cookie deleted"))
}




func loginHandler(w http.ResponseWriter, r *http.Request) {
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
  
	user, err := authenticateUser(req.Login, req.Password)
	if err != nil {
		http.Error(w, "Failed to get user", http.StatusUnauthorized)
		return
	}
	
	newToken, err := replaceToken(user)
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


	http.SetCookie(w, &cookie)
	http.SetCookie(w, &cookie2)


	json.NewEncoder(w).Encode(map[string]string{
		"message": "Login successful",
	})
  
}


func registerHandler(w http.ResponseWriter, r *http.Request) {
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

	hashedPassword, err := Hashing(req.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Generate token (will send plain token in cookie, hash stored in DB)
	token, err := GenerateSecureToken()
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	hashedToken, err := Hashing(token)
	if err != nil {
		http.Error(w, "Failed to hash token", http.StatusInternalServerError)
		return
	}

	user := User{
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

func connectToDB() *gorm.DB {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbSslMode := os.Getenv("DB_SSLMODE")

	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=%s",
		dbUser, dbPassword, dbName, dbHost, dbPort, dbSslMode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to get database instance:", err)
	}

	err = sqlDB.Ping()
	if err != nil {
		log.Fatal("Error pinging database:", err)
	}

	fmt.Println("Successfully connected to the database!")
	return db
}

func Hashing(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func GenerateSecureToken() (string, error) {
	bytes := make([]byte, 32) // 256 bits
	_, err := rand.Read(bytes)
	if err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}

func authenticateUser(login string, plainPassword string) (*User, error) {
	var user User

	result := db.Where("login = ?", login).First(&user)
	if result.Error != nil {
		// User not found
		return nil, fmt.Errorf("invalid login")
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(plainPassword))
	if err != nil {
		// Password doesn't match
		return nil, fmt.Errorf("invalid password")
	}

	return &user, nil
}



func replaceToken(user *User) (string,error){
	token, err := GenerateSecureToken()
	if err != nil {
		return "", err
	}

	hashedToken, err := Hashing(token)
	if err != nil {
		return "", err
	}

	user.Token = hashedToken
	result := db.Save(user);
	if result.Error != nil {
		return "", result.Error
	}

	return token, nil

}


func meHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("token")

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("here")
		return
	}
	username, err := r.Cookie("username")
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("here3")
		return

	}
	var user User

	result := db.Where("login = ?", username.Value).First(&user)
	if result.Error != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		fmt.Println("Here2")
		return
	}
	fmt.Println(user.Password)
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

package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"backend/lessons"
	"backend/get_grades"
	"backend/models"
	"backend/login"
	"backend/register"
	"backend/logout"
	"backend/gpachart_grades"
	"backend/meHandler"
	"backend/exams"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/gorilla/handlers"  // Import the CORS package
)



var db *gorm.DB


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

	err = db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("Error migrating schema:", err)
	}

	// Set up CORS configuration
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:3000"}) // Allow frontend from localhost:3000
	methods := handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS", "PUT", "DELETE"})
	credentials := handlers.AllowCredentials()

	// Register routes
	http.HandleFunc("/api/register", registerHandler)
	http.HandleFunc("/api/login", loginHandler)
	http.HandleFunc("/api/me", meHandler)
	http.HandleFunc("/api/logout", logoutHandler)
	http.HandleFunc("/api/get_grades", getGradesHandler)
	http.HandleFunc("/api/get_graph_grades", getGraphGrade)
	http.HandleFunc("/api/get_exams", getExamsHandler)
	http.HandleFunc("/api/get_lessons", getLessonsHandler)



	fmt.Println("Server started on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(origins, headers, methods, credentials)(http.DefaultServeMux)))
}


func getLessonsHandler(w http.ResponseWriter, r *http.Request) {
	getLessons.Lessons(w,r,db)
}

func getExamsHandler(w http.ResponseWriter, r *http.Request) {
	getExams.GetExams(w,r,db)
}

func getGraphGrade(w http.ResponseWriter, r *http.Request) {
	getGraphGrades.GetGrades(w,r,db)
}


func getGradesHandler(w http.ResponseWriter, r *http.Request) {
	getGrades.GetGrades(w,r,db)
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	logout.Logout(w,r)
}


func loginHandler(w http.ResponseWriter, r *http.Request) {
	login.Login(w,r,db)
}


func registerHandler(w http.ResponseWriter, r *http.Request) {
	register.Register(w,r,db)
}



func meHandler(w http.ResponseWriter, r *http.Request) {
	me.MeHandler(w,r,db)
}

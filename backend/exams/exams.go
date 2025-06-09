package getExams

import (
	"encoding/json"
	"net/http"
	"gorm.io/gorm"
)



type Exam struct {
	Date      string `gorm:"column:date"`       // або time.Time, якщо date — тип DATE/TIMESTAMP
	ClassName string `gorm:"column:class_name"`
}

func GetExams(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var body map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	class, ok := body["id"]
	if !ok {
		http.Error(w, "Missing or invalid id", http.StatusBadRequest)
		return
	}

	var exams []Exam
	result := db.Raw("SELECT date, class_name FROM exams WHERE class_id = ?", class).Scan(&exams)
	if result.Error != nil {
		http.Error(w, "Exams not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(exams)
}


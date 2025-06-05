package getGraphGrades

import (
	"encoding/json"
	"net/http"
	"time"
	"gorm.io/gorm"
)

type GradeRecord struct {
    Grade      int       `gorm:"column:grade"`
    TimePlaced time.Time `gorm:"column:time_placed"`
}

func GetGrades(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
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
	id, ok := body["id"]
	if !ok {
		http.Error(w, "Missing or invalid id", http.StatusBadRequest)
		return
	}
	var grade []GradeRecord
	rows := db.Raw("SELECT grade,time_placed FROM grades WHERE time_placed >= NOW() - INTERVAL '14 days' AND users_id = ?;", id).Scan(&grade)
	if rows.Error != nil {
		http.Error(w, "Grade not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(grade)
}


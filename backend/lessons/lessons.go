package getLessons

import (
	"encoding/json"
	"net/http"
	"gorm.io/gorm"
	"time"
)



type Lesson struct {
	name string `gorm:"column:name"`
	schedule_order int `gorm:"column:schedule_order"`
	day_of_week string `gorm:"column:day_of_week"`

}

func Lessons(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
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

	class, ok := body["class_id"]
	if !ok {
		http.Error(w, "Missing or invalid id", http.StatusBadRequest)
		return
	}

	var lessons []Lesson
	today := time.Now().Weekday()

	result := db.Raw("SELECT name,schedule_order,day_of_week FROM lessons WHERE class_id = ? AND day_of_week = ?", class, today).Scan(&lessons)
	if result.Error != nil {
		http.Error(w, "Exams not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(lessons)
}


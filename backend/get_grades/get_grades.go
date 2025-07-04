package getGrades

import (
	"encoding/json"
	"net/http"
	"gorm.io/gorm"
)



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
	var grade int
	rows := db.Raw("SELECT average_grade FROM users WHERE id = ?",id).Scan(&grade)
	if rows.Error != nil {
		http.Error(w, "Grade not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(grade)
}


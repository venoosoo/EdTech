package getGrades

import (
	"encoding/json"
	"net/http"
	"gorm.io/gorm"
	"fmt"
)



func GetGrades(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}
	fmt.Println("hey1")
	var body map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}
	fmt.Println("Hey2")
	fmt.Println(body)
	id, ok := body["id"]
	if !ok {
		http.Error(w, "Missing or invalid id", http.StatusBadRequest)
		return
	}
	fmt.Println("Hey3")
	var grade int
	rows := db.Raw("SELECT average_grade FROM users WHERE id = ?",id).Scan(&grade)
	if rows.Error != nil {
		http.Error(w, "Grade not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	fmt.Println(rows)
	json.NewEncoder(w).Encode(grade)
}


package auth




import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"backend/models"
)



func AuthenticateUser(login string, plainPassword string, db *gorm.DB) (*models.User, error) {
	var user models.User

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

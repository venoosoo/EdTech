
package replace




import (
	"time"
	"gorm.io/gorm"
	"backend/security"
	"backend/models"
)

type User struct {
	ID        uint      `gorm:"primaryKey"`
	Login     string    `gorm:"not null;unique"`
	Password  string    `gorm:"not null"`
	CreatedAt time.Time `gorm:"not null"`
	Token     string    `gorm:"size:64;uniqueIndex"`
}


func ReplaceToken(user *models.User, db *gorm.DB) (string,error){
	token, err := security.GenerateSecureToken()
	if err != nil {
		return "", err
	}

	hashedToken, err := security.Hashing(token)
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

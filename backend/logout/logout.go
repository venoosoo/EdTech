package logout

import (
	"net/http"
	"time"
)


func Logout(w http.ResponseWriter, r *http.Request) {
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

   w.Write([]byte("Cookie deleted"))

	cookie3 := &http.Cookie{
		Name:     "id",
    Value:    "",
    Path:     "/",
    Expires:  time.Unix(0, 0),
    MaxAge:   -1,
    HttpOnly: true,
    Secure:   true,
    SameSite: http.SameSiteLaxMode,
  }
	http.SetCookie(w, cookie)
	http.SetCookie(w, cookie2)
	http.SetCookie(w, cookie3)
  w.Write([]byte("Cookie deleted"))
}


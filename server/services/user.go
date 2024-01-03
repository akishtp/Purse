package services

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type User struct {
	Id			int 	`json:"id"`
	Name 		string 	`json:"name"`
	Email 		string 	`json:"email"`
	Password	string 	`json:"password"`
}

func CreateUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var u User
		json.NewDecoder(r.Body).Decode(&u)

// check if user with same name exists
		name := db.QueryRow("SELECT * FROM users WHERE name = $1", u.Name)
		if name != nil {
			log.Fatal("name already used")
		}

		err := db.QueryRow("INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id", u.Name, u.Password).Scan(&u.Id)
		if err != nil {
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(u)
	}
}

func GetUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		var u User
		err := db.QueryRow("SELECT * FROM users WHERE id = $1", id).Scan(&u.Id, &u.Name, &u.Password)
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		json.NewEncoder(w).Encode(u)
	}
}
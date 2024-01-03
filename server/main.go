package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	S "github.com/akishtp/purse/services"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func goDotEnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
	  log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}

func main() {
	db, err := sql.Open("postgres", goDotEnvVariable("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close();

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT)")
	if err != nil{
		log.Fatal(err)
	}

	router := mux.NewRouter()
	router.HandleFunc("/api/users", S.CreateUser(db)).Methods("POST")
	router.HandleFunc("/api/users/{id}", S.GetUser(db)).Methods("GET")

	enhancedRouter := enableCORS(jsonContentTypeMiddleware(router))

	fmt.Println("server running on http://localhost:8000");
	log.Fatal(http.ListenAndServe(":8000", enhancedRouter))

}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})

}

func jsonContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}


package main

import (
	"fmt"
	"log"

	"github.com/akishtp/purse/controller"
	"github.com/akishtp/purse/database"
	"github.com/akishtp/purse/middleware"
	"github.com/akishtp/purse/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	loadEnv()
	loadDatabase()
	serveApplication()
}

func loadDatabase() {
	database.Connect()
	database.Database.AutoMigrate(&models.User{})
	database.Database.AutoMigrate(&models.Account{})
}

func loadEnv() {
    err := godotenv.Load(".env")
    if err != nil {
        log.Fatal(err)
    }
}

func serveApplication() {
    router := gin.Default()

	router.Use(cors.Default())

    publicRoutes := router.Group("/auth")
    publicRoutes.POST("/signup", controller.Signup)
    publicRoutes.POST("/login", controller.Login)

	protectedRoutes := router.Group("/api")
    protectedRoutes.Use(middleware.JWTAuthMiddleware())
    protectedRoutes.POST("/account", controller.AddNewAccount)
    protectedRoutes.GET("/account", controller.GetUserAccounts)

    router.Run(":8000")
    fmt.Println("Server running on port 8000")
}

// jwt:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYXQiOjE3MDQzODE4MjksImlhdCI6MTcwNDM4MTgyOSwiaWQiOjF9.Lkx_HaYrqFhLUZTnXJMgjgIHyKuUFLpA49CkJ1b6bmo"
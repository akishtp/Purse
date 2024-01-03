package main

import (
	"fmt"
	"log"

	"github.com/akishtp/purse/controller"
	"github.com/akishtp/purse/database"
	"github.com/akishtp/purse/models"
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

    publicRoutes := router.Group("/auth")
    publicRoutes.POST("/signup", controller.Signup)
    publicRoutes.POST("/login", controller.Login)

    router.Run(":8000")
    fmt.Println("Server running on port 8000")
}
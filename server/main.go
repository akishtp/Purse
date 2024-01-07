package main

import (
	"fmt"
	"log"

	"github.com/akishtp/purse/controller"
	"github.com/akishtp/purse/database"
	"github.com/akishtp/purse/middleware"
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
	database.Database.AutoMigrate(&models.Record{})
	database.Database.AutoMigrate(&models.Account{})
	database.Database.AutoMigrate(&models.User{})
}

func loadEnv() {
    err := godotenv.Load(".env")
    if err != nil {
        log.Fatal(err)
    }
}

func serveApplication() {
    router := gin.New()

	// router.Use(cors.Default())
	router.Use(CORSMiddleware())

    publicRoutes := router.Group("/auth")
    publicRoutes.POST("/signup", controller.Signup)
    publicRoutes.POST("/login", controller.Login)

	protectedRoutes := router.Group("/api")
    protectedRoutes.Use(middleware.JWTAuthMiddleware())
    protectedRoutes.POST("/accounts", controller.AddAccount)
    protectedRoutes.GET("/accounts", controller.GetUserAccounts)
    protectedRoutes.POST("/records", controller.AddRecord)
    protectedRoutes.GET("/records", controller.GetUserRecords)

    router.Run(":8000")
    fmt.Println("Server running on port 8000")
}

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("Access-Control-Allow-Origin", "*")
        c.Header("Access-Control-Allow-Credentials", "true")
        c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        c.Next()
    }
}
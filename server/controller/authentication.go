package controller

import (
	"net/http"

	"github.com/akishtp/purse/helper"
	"github.com/akishtp/purse/models"
	"github.com/gin-gonic/gin"
)

func Signup(context *gin.Context) {
	var input models.AuthenticationInput
    var accountInput models.Account

	if err := context.ShouldBindJSON(&input); err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	user := models.User {
		Name: input.Name,
		Password: input.Password,
	}

	savedUser, err := user.Save()

	if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    jwt, err := helper.GenerateJWT(*savedUser)
    if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": "Could not generate JWT"})
        return
    }
    
    accountInput.UserID = savedUser.ID
    accountInput.Balance = "0"
    accountInput.AccountName = "CASH"
    accountInput.Color = "#2481de"
    accountInput.Save()
    // if err != nil {
    //     context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    //     return
    // }

	context.JSON(http.StatusCreated, gin.H{"name": savedUser.Name, "jwt": jwt})

}

func Login(context *gin.Context) {
    var input models.AuthenticationInput

    if err := context.ShouldBindJSON(&input); err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    user, err := models.FindByName(input.Name)

    if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    err = user.ValidatePassword(input.Password)

    if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    jwt, err := helper.GenerateJWT(user)
    if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    context.JSON(http.StatusOK, gin.H{"name": user.Name, "jwt": jwt, "accounts": user.Accounts})
} 

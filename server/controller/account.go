package controller

import (
	"net/http"

	"github.com/akishtp/purse/helper"
	"github.com/akishtp/purse/models"
	"github.com/gin-gonic/gin"
)

func AddNewAccount(context *gin.Context){
	var input models.Account
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := helper.CurrentUser(context)
	if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	input.UserID = user.ID

	savedAccount, err := input.Save()
	if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	context.JSON(http.StatusCreated, gin.H{"id": savedAccount.ID,"account_name": savedAccount.AccountName, "Balance": savedAccount.Balance, "Color": savedAccount.Color})
}

func GetUserAccounts(context *gin.Context) {
	user, err := helper.CurrentUser(context)

	if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
	context.JSON(http.StatusOK, gin.H{"data": user.Accounts})
}
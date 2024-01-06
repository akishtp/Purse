package controller

import (
	"net/http"

	"github.com/akishtp/purse/helper"
	"github.com/akishtp/purse/models"
	"github.com/gin-gonic/gin"
)

func AddRecord (context *gin.Context) {
	var input models.Record
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
	savedRecord, err := input.Save()
	if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	context.JSON(http.StatusCreated, gin.H{"ID": savedRecord.ID,"type": savedRecord.Type, "amount": savedRecord.Amount, "category": savedRecord.Category, "date_time": savedRecord.DateTime, "note": savedRecord.Note})
}
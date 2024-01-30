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

	user, err := helper.CurrentRecordUser(context)
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

	err = models.UpdateAccountBalance(savedRecord.AccountID, savedRecord.Amount, savedRecord.Type )
	if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	context.JSON(http.StatusCreated, gin.H{"ID": savedRecord.ID,"type": savedRecord.Type, "amount": savedRecord.Amount, "category": savedRecord.Category, "date_time": savedRecord.DateTime, "note": savedRecord.Note, "account_id": savedRecord.AccountID})
}

func GetUserRecords(context *gin.Context) {
	user, err := helper.CurrentRecordUser(context)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Retrieve records for the current user
	records, err := (&models.Record{UserID: user.ID}).FindRecordsbyUser()
	if err != nil {
        context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
	context.JSON(http.StatusOK, gin.H{"data": records})
}
package models

import (
	"fmt"

	"github.com/akishtp/purse/database"
	"github.com/goccy/go-json"
	"gorm.io/gorm"
)

type Account struct{
	gorm.Model
	AccountName string 		`gorm:"not null;" json:"account_name"`
	Balance 	json.Number	`gorm:"not null;" json:"balance"`
	Color		string		`gorm:"not null;" json:"color"`
	UserID 		uint
	Record		[]Record
}

func (account *Account) Save() (*Account, error){
	err := database.Database.Create(&account).Error

	if err != nil {
        return &Account{}, err
    }
	return account, nil
}

func FindAccountByRecordId(id uint) (Account, error) {
    var account Account
	err:= database.Database.Find(&account, "user_id = ?", id).Error
    if err != nil {
        return Account{}, err
    }

    return account, nil
}

func UpdateAccountBalance(id uint, amount json.Number, recordtype string) error{
	var account Account
	if err := database.Database.First(&account, id).Error; err != nil {
		return err
	}

	currentBalance, err := account.Balance.Float64()
	if err != nil {
		return err
	}

	floatAmount, err := amount.Float64()
	if err != nil {
		return err
	}

	var newBalance float64
	
	if(recordtype == "Expense"){
		newBalance = currentBalance - floatAmount
	}else if(recordtype == "Income"){
		newBalance = currentBalance + floatAmount
	}

	account.Balance = json.Number(fmt.Sprintf("%.2f", newBalance))

    if err := database.Database.Save(&account).Error; err != nil {
		return err
	}
	return nil
}
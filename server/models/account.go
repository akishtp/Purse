package models

import (
	"github.com/akishtp/purse/database"
	"gorm.io/gorm"
)

type Account struct{
	gorm.Model
	AccountName string 	`gorm:"not null;" json:"account_name"`
	Balance 	string	`gotm:"not null;" json:"balance"`
	Color		string	`gorm:"not null;" json:"color"`
	UserID 		uint
	Record  	[]Record
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
    err := database.Database.Preload("Records").Where("ID=?", id).Find(&account).Error
    if err != nil {
        return Account{}, err
    }
    return account, nil
}
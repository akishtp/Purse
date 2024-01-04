package models

import (
	"github.com/akishtp/purse/database"
	"gorm.io/gorm"
)

type Account struct{
	gorm.Model
	AccountName string 	`gorm:"not null;" json:"account_name"`
	Balance 	int		`gotm:"not null;" json:"balance"`
	Color		string	`gorm:"not null;" json:"account"`
	UserID 		uint
}

func (account *Account) Save() (*Account, error){
	err := database.Database.Create(&account).Error

	if err != nil {
        return &Account{}, err
    }
	return account, nil
}
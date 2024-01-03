package models

import "gorm.io/gorm"

type Account struct{
	gorm.Model
	AccountName string `gorm:"type:text" json:"account_name"`
	UserId 		uint
}
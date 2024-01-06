package models

import (
	"time"

	"github.com/akishtp/purse/database"
	"gorm.io/gorm"
)

type Record struct{
	gorm.Model
	Type 		string 		`gorm:"not null;" json:"type"`
	AccountName string		`gorm:"not null;" json:"account_name"`
	Amount 		string		`gorm:"not null;" json:"amount"`
	Category 	string		`gorm:"not null;" json:"category"`
	DateTime	time.Time	`gorm:"not null;" json:"date_time"`
	Note 		string		`gorm:"not null;" json:"note"`
	AccountID 	uint
	UserID 		uint
}

func (record *Record) Save() (*Record, error){
	err := database.Database.Create(&record).Error

	if err != nil {
        return &Record{}, err
    }
	
	return record, nil
}
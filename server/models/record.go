package models

import (
	"time"

	"github.com/akishtp/purse/database"
	"github.com/goccy/go-json"
	"gorm.io/gorm"
)

type Record struct{
	gorm.Model
	Type 		string 		`gorm:"not null;" json:"type"`
	AccountName string		`gorm:"not null;" json:"account_name"`
	Amount 		json.Number	`gorm:"not null;" json:"amount"`
	Category 	string		`gorm:"not null;" json:"category"`
	DateTime	time.Time	`gorm:"not null;type:timestamp without time zone" json:"date_time"`
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

func (record *Record) FindRecordsbyUser() ([]Record, error){
	var records []Record
	err := database.Database.Order("date_time desc").Find(&records, "user_id = ?", record.UserID).Error
	if err != nil {
        return nil, err
    }
	return records, nil
}
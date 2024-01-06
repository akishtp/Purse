FROM golang:1.21.5

WORKDIR /app

COPY . .

RUN go get -d -v ./...

RUN go build -o github.com/akishtp/purse .

EXPOSE 8000

CMD ["./main"]
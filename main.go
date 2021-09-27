package main

import (
	"log"
	"net/http"
)

func main() {
	http.Handle("/incheck/", http.StripPrefix("/incheck/", http.FileServer(http.Dir("./build"))))
	log.Fatal(http.ListenAndServe(":80", nil))
}

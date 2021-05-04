package main

import (
	"log"
	"net/http"
)

func main() {
	// r := mux.NewRouter()
	http.Handle("/testStarted", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	}))
	http.Handle("/incheck/", http.StripPrefix("/incheck/", http.FileServer(http.Dir("./build"))))
	log.Fatal(http.ListenAndServe(":8000", nil))
}

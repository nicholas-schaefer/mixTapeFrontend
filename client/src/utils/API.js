import axios from "axios";
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const AUTHORSEARCH = "inauthor:"
const ORDERING = "&orderBy=newest"
const MAXRESULTS = "&maxResults=40"
const APIKEY = "&key=AIzaSyBvrAqrUn3DQqWapuse08m421Df1ZU5ZcU";

export default {
  search: function(query) {
    return axios.get(`${BASEURL}${AUTHORSEARCH}${query}${ORDERING}${MAXRESULTS}${APIKEY}`);
  },
  // Gets all books
  getBooks: function() {
  return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
  return axios.post("/api/books", bookData);
}
};

import axios from "axios";
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const AUTHORSEARCH = "inauthor:"
const ORDERING = "&orderBy=newest"
const MAXRESULTS = "&maxResults=40"
const APIKEY = "&key=AIzaSyBvrAqrUn3DQqWapuse08m421Df1ZU5ZcU";

export default {
  // Gets all songs
  getSongs: function(loggedInUserId) {
  return axios.get("/api/tracks/" + "/?q=" + loggedInUserId);
  },
  // // Gets all songs
  // getSongs: function() {
  // return axios.get("/api/tracks");
  // },
  // Saves track to the database
  banSong: function(trackData) {
  return axios.post("/api/tracks", trackData);
  },
  // Deletes the track with the given id
  deleteSong: function(id) {
    return axios.delete("/api/tracks/" + id);
  }
  // search: function(query) {
  //   return axios.get(`${BASEURL}${AUTHORSEARCH}${query}${ORDERING}${MAXRESULTS}${APIKEY}`);
  // },
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  artists: { type: String, required: true },
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  trackId: { type: String, required: true, unique: true },
  author: { type: String },
  publisher: { type: String },
  publishedDate: { type: String },
  isbnLong: { type: String, unique: true },
  googleBookListing: { type: String},
  // date: { type: Date, default: Date.now }
});

const Track = mongoose.model("Track", bookSchema);

module.exports = Track;


// const Book = mongoose.model("Book", bookSchema);

// module.exports = Book;

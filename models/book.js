const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  publishedDate: { type: String, required: true },
  isbnLong: { type: String, required: true, unique: true },
  googleBookListing: { type: String, required: true },
  // date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

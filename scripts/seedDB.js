const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/googlebooks"
);

const bookSeed = [
  {
    title: "The Dead Zone",
    author: "Stephen King",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Lord of the Flies",
    author: "William Golding",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "The Punch Escrow",
    author: "Tal M. Klein",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Coraline",
    author: "Neil Gaiman",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Code: The Hidden Language of Computer Hardware and Software",
    author: "Charles Petzold",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "The Everything Store: Jeff Bezos and the Age of Amazon",
    author: "Brad Stone",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Total Recall: My Unbelievably True Life Story",
    author: "Arnold Schwarzenegger",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
    author: "Ashlee Vance",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Astrophysics for People in a Hurry",
    author: "Neil deGrasse Tyson",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "1984",
    author: "George Orwell",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  },
  {
    title: "Born a Crime: Stories from a South African Childhood",
    author: "Trevor Noah",
    publisher: "Hatchets",
    publishedDate: "1763",
    isbnLong: "1234567891012",
    googleBookListing: "https://www.google.com"
  }
];

db.Book
  .remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

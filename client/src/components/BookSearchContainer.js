import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import BookDetail from "./BookDetail";
import API from "../utils/API";
import {List, ListItem} from "./List";
import DeleteBtn from "./DeleteBtn";

class BookSearchContainer extends Component {
  state = {
    result: "",
    search: "",
    books: []
  };

  // When this component mounts, console log what's currently in the MongoDatabase 
  // and populate example search with author Dav Pilkey 
  componentDidMount() {
    this.viewMongoDbData()
    // this.searchBooks("Dav+Pilkey");
  };

  viewMongoDbData = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  searchBooks = query => {
    API.search(query)
      .then(res => this.setState({ result: res.data }))
      .catch(err => console.log(err));
  };
  
   // Deletes a book from the database with a given id, then reloads books from the db
   deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.viewMongoDbData())
      .catch(err => console.log(err));
  };

  handleAddSubmit = volumeInfo => {
      API.saveBook({
        title: volumeInfo.title,
        author: volumeInfo.authors[0],
        publisher: volumeInfo.publisher,
        publishedDate: volumeInfo.publishedDate,
        isbnLong: (volumeInfo.industryIdentifiers[1] == null) ? 'undefined' : volumeInfo.industryIdentifiers[1].identifier,
        googleBookListing: volumeInfo.canonicalVolumeLink
    })
    .then(res => this.viewMongoDbData())
    .catch(err => console.log(err));
    // console.log(volumeInfo)
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Google Books API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBooks(this.state.search);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-8">
            <Card
              heading={"PubDate Planner"}
            >
              {this.state.result ? (
                <BookDetail 
                results={this.state.result.items} 
                onClickAction={this.handleAddSubmit}
                />
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Card>
          </Col>
          <Col size="md-4">
            <Card heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
            <Card heading="Results">
            <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={book.googleBookListing} target="blank">
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <p>Publish Date: {book.publishedDate}</p>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookSearchContainer;

import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import API from "../utils/API";
import {List, ListItem} from "./List";
import DeleteBtn from "./DeleteBtn";

class BookSearchResults extends Component {
  state = {
    result: "",
    search: "",
    books: []
  };

  // When this component mounts, console log what's currently in the MongoDatabase 
  componentDidMount() {
    this.viewMongoDbData()
  };

  viewMongoDbData = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };
  
   // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.viewMongoDbData())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-8">
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

export default BookSearchResults;

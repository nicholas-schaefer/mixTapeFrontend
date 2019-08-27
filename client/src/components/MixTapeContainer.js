import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import BookDetail from "./BookDetail";
import MixTapeDetail from "./MixTapeDetail";
import API from "../utils/API";
import { List, ListItem } from "./List";
import DeleteBtn from "./DeleteBtn";

import queryString from 'query-string';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

class MixTapeContainer extends Component {
  state = {
    result: "",
    search: "",
    books: [],
    serverData: "",
  };

  // When this component mounts, console log what's currently in the MongoDatabase 
  // and populate example search with author Dav Pilkey 
  componentDidMount() {
    var SpotifyWebApi = require('spotify-web-api-node');
    var spotifyApi = new SpotifyWebApi();

    this.viewMongoDbData()
    // this.searchBooks("Dav+Pilkey");
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    spotifyApi.setAccessToken(accessToken);

    // spotifyApi.getMe()
    // .then(data => this.setState({
    //   serverData: {
    //   user: {
    //     name: data.body.display_name
    //   }
    //   }}), function (err) {
    //   console.log('Something went wrong!', err);
    // });

    // spotifyApi.getMe()
    // .then(data => this.setState(
    //   {
    //    serverData: data.body.display_name
    //   }))


    spotifyApi.getMe()
      .then(function (data) {
        console.log('Some information about the authenticated user', data.body);
      }, function (err) {
        console.log('Something went wrong!', err);
      });

    spotifyApi.getUserPlaylists('8n63fm6ayfj03y5qw8jrvtquk')
      .then(function (data) {
        console.log('Retrieved playlists', data.body);
      }, function (err) {
        console.log('Something went wrong!', err);
      });

    spotifyApi.getPlaylistTracks('3jzUdvQ9mzUZLP08odGSwS')
      .then(
        function (data) {
          console.log('The playlist contains these tracks', data.body);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );

    let getAllTracksSetState = (trackUri, stateKey) => {
      let state = stateKey;
      let offsetVal = 0;
      let offsetIncrementer = 0;
      const myPersonalPlaylistTracks = [];
      var final = {
        items: []
      };
      let getPlaylists = (offsetVal, trackUri) => {
        spotifyApi.getPlaylistTracks(trackUri, { limit: 100, offset: offsetVal })
          .then(data => {
            if (data.body.next != null) {
              console.log("On we Go!")
              data.body.items.forEach(function (val, index) {
                myPersonalPlaylistTracks.push(val);
              });
              offsetIncrementer += 100;
              getPlaylists(offsetIncrementer, trackUri)
            } else {
              console.log("End of the Road!")
              data.body.items.forEach(function (val, index) {
                myPersonalPlaylistTracks.push(val);
                final.items = myPersonalPlaylistTracks;
              });
              console.log('The playlist contains these tracks', myPersonalPlaylistTracks)
              console.log('The playlist contains these tracks', final)
              this.setState({ [`${state}`]: final })
            }
          },
            function (err) {
              console.log('Something went wrong!', err);
            }
          );
      }
      getPlaylists(offsetVal, trackUri, stateKey);
    }
    getAllTracksSetState('37i9dQZF1DWZQaaqNMbbXa', 'serverData');

  };


  handleSongAdd = () => {
    var SpotifyWebApi = require('spotify-web-api-node');
    var spotifyApi = new SpotifyWebApi();
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.addTracksToPlaylist('4Xphi5ngSLqvbgsWQmsTvk', ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"])
      .then(function (data) {
        console.log('Added tracks to playlist!');
      }, function (err) {
        console.log('Something went wrong!', err);
      });

  };

  handleUserDisplay = () => {
    var SpotifyWebApi = require('spotify-web-api-node');
    var spotifyApi = new SpotifyWebApi();
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let name = '';
    spotifyApi.setAccessToken(accessToken);

    console.log(this.state.serverData);
    // spotifyApi.getMe()
    //   .then(data => {
    //     name = data.body.display_name
    //     this.setState({
    //       serverData: {
    //         user: {
    //           name
    //         }
    //       }
    //     })
    //   })
    // spotifyApi.getPlaylistTracks('37i9dQZF1DWYtg7TV07mgz')
    //   .then(data => this.setState({
    //     serverData: {
    //       playlists: {
    //         title: data.body.items[0].track.name,
    //         uri: data.body.items[0].track.uri,
    //         artists: data.body.items[0].track.artists[0].name
    //       },
    //       user: {
    //         name
    //       }
    //     }
    //   }))

    // spotifyApi.getPlaylistTracks('37i9dQZF1DWYtg7TV07mgz')
    //   .then(data => this.setState({serverData: data.body}))
    //   console.log(this.state.serverData);
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

  handleSaveSong = track => {
    console.log(track.id)
    var SpotifyWebApi = require('spotify-web-api-node');
    var spotifyApi = new SpotifyWebApi();
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.addTracksToPlaylist(`4Xphi5ngSLqvbgsWQmsTvk`, [`spotify:track:${track.id}`])
      .then(function (data) {
        console.log('Added tracks to playlist!');
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  };

  handleBanSong = track => {
    API.banSong({
      title: track.name,
      author: track.name,
      publisher: track.name,
      publishedDate: track.name,
      isbnLong: track.uri,
      googleBookListing: track.name
    })
      .then(res => this.viewMongoDbData())
      .catch(err => console.log(err));
    console.log(track)
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
              heading={"What you Want?"}
            >
              {this.state.serverData ? (
                <MixTapeDetail
                  results={this.state.serverData}
                  onClickActionBan={this.handleBanSong}
                  onClickActionSave={this.handleSaveSong}
                  isbnInDatabase={this.state.books}
                />
              ) : (
                  <div>
                    <h3>Your Spotify Playlists</h3>
                    <ul>
                      <li><strong>--- Nick's Dance Tunes --- (Target Playlist)</strong></li>
                      <li>Nick pretends he can rap</li>
                      <li>Classic Rock</li>
                      <li>Everything Else</li>
                    </ul>
                  </div>
                )}
              <span
                onClick={() => window.location = 'http://localhost:8888/login'}
                className="btn btn-secondary"
                role="button"
                tabIndex="0">
                Login to Spotify
          </span>
              <span
                onClick={() => this.handleSongAdd()}
                className="btn btn-secondary"
                role="button"
                tabIndex="0">
                Add this songs!
          </span>
              <span
                onClick={() => this.handleUserDisplay()}
                className="btn btn-secondary"
                role="button"
                tabIndex="0">
                Display Username
          </span>
            </Card>

            <Card
              heading={"Old book search"}
            >
              {this.state.result ? (
                <BookDetail
                  results={this.state.result.items}
                  onClickAction={this.handleAddSubmit}
                />
              ) : (
                  <div>
                    <h3>Your Spotify Playlists</h3>
                    <ul>
                      <li><strong>--- Nick's Dance Tunes --- (Target Playlist)</strong></li>
                      <li>Nick pretends he can rap</li>
                      <li>Classic Rock</li>
                      <li>Everything Else</li>
                    </ul>
                  </div>
                )}
            </Card>
          </Col>
          <Col size="md-4">
            <Card heading="Baby I got it!">
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

export default MixTapeContainer;

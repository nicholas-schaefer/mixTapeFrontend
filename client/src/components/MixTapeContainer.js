import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import MixTapeDetail from "./MixTapeDetail";
import API from "../utils/API";
import { List, ListItem } from "./List";
import DeleteBtn from "./DeleteBtn";
import SelectBtn from "./SelectBtn";
import queryString from 'query-string';


class MixTapeContainer extends Component {
  state = {
    result: "",
    search: "",
    selectedSendingPlaylistSearch: "",
    selectedSendingPlaylistData: [],
    selectedSendingPlaylistDetails: "",
    userData: "",
    banishedSongs: [],
    serverData: "",
    receivingPlaylist: "",
    userPlaylists: []
  };

  componentDidMount() {
    var SpotifyWebApi = require('spotify-web-api-node');
    var spotifyApi = new SpotifyWebApi();

    this.viewMongoDbData()
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMe()
      .then(data => this.viewMongoDbData(data.body.id), function (err) {
          console.log('Something went wrong!', err);
        });

    spotifyApi.getMe()
      .then(data => this.setState(
        {
          userData: data.body
        }), function (err) {
          console.log('Something went wrong!', err);
        });

    spotifyApi.getUserPlaylists(this.state.userData.id)
      .then(data => this.setState(
        {
          userPlaylists: data.body.items
        }), function (err) {
          console.log('Something went wrong!', err);
        }
        );
  };

  getPlaylistDetailsSetState = (trackUri, stateKey) => {
    var SpotifyWebApi = require('spotify-web-api-node');
    var spotifyApi = new SpotifyWebApi();
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    spotifyApi.setAccessToken(accessToken);
    let state = stateKey;
    spotifyApi.getPlaylist(trackUri)
      .then(data => {
        console.log(state);
        console.log('The playlist contains these tracks', data.body);
        this.setState({ [`${state}`]: data.body })
        console.log(this.state.receivingPlaylist.name);
      },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
  }

  getAllTracksSetState = (trackUri, stateKey) => {
    let state = stateKey;
    let offsetVal = 0;
    let offsetIncrementer = 0;
    const myPersonalPlaylistTracks = [];
    var final = {
      items: []
    };
    let getPlaylists = (offsetVal, trackUri) => {
      var SpotifyWebApi = require('spotify-web-api-node');
      var spotifyApi = new SpotifyWebApi();
      let parsed = queryString.parse(window.location.search);
      let accessToken = parsed.access_token;
      spotifyApi.setAccessToken(accessToken);
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
            console.log(this.state.selectedSendingPlaylistData);
            console.log(this.state.selectedSendingPlaylistDetails);
          }
        },
          function (err) {
            console.log('Something went wrong!', err);
          }
        );
    }
    getPlaylists(offsetVal, trackUri, stateKey);
  }


  viewMongoDbData = (a) => {
    console.log(a)
    API.getSongs(a)
      .then(res => this.setState({ banishedSongs: res.data }))
      .catch(err => console.log(err));
  };

  deleteSong = id => {
    API.deleteSong(id)
      .then(res => this.viewMongoDbData())
      .catch(err => console.log(err));
  };

  handleSaveSong = track => {
    console.log(track.id)
    var SpotifyWebApi = require('spotify-web-api-node');
    var spotifyApi = new SpotifyWebApi();
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.addTracksToPlaylist(this.state.selectedSendingPlaylistDetails.id, [`spotify:track:${track.id}`])
      .then(res => this.getAllTracksSetState(this.state.selectedSendingPlaylistSearch, 'selectedSendingPlaylistData'))
      .catch(err => console.log(err));
  };

  handleBanSong = track => {
    this.state.userPlaylists.map(item => (console.log(item.name)))
    console.log(this.state.userData.id)
    API.banSong({
      title: track.name,
      artists: track.artists.map(artist => artist.name).join(', '),
      userName: this.state.userData.display_name,
      userId: this.state.userData.id,
      trackId: track.uri,
    })
      .then(res => this.viewMongoDbData(this.state.userData.id))
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

  handleReceivingPlaylistSubmit = event => {
    event.preventDefault();
    console.log(this.state.search);
    this.getAllTracksSetState(this.state.search, 'serverData');
    this.getPlaylistDetailsSetState(this.state.search, 'receivingPlaylist');
  };

  handleReceivingPlaylistSubmitLink = playlistId => {
    this.setState({search: playlistId})
    this.getAllTracksSetState(playlistId, 'serverData');
    this.getPlaylistDetailsSetState(playlistId, 'receivingPlaylist');
  };
  
  handleSendingPlaylistSubmit = event => {
    event.preventDefault();
    console.log(this.state.selectedSendingPlaylistSearch);
    this.getAllTracksSetState(this.state.selectedSendingPlaylistSearch, 'selectedSendingPlaylistData');
    this.getPlaylistDetailsSetState(this.state.selectedSendingPlaylistSearch, 'selectedSendingPlaylistDetails');
  };

  handleSendingPlaylistSubmitLink = playlistId => {
    this.setState({selectedSendingPlaylistSearch: playlistId})
    this.getAllTracksSetState(playlistId, 'selectedSendingPlaylistData');
    this.getPlaylistDetailsSetState(playlistId, 'selectedSendingPlaylistDetails');
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-8">
            <Card
              heading={this.state.receivingPlaylist.name}
            >
              {this.state.serverData ? (
                <MixTapeDetail
                  results={this.state.serverData}
                  onClickActionBan={this.handleBanSong}
                  onClickActionSave={this.handleSaveSong}
                  trackInDatabase={this.state.banishedSongs}
                  trackInReceivingDatabase={this.state.selectedSendingPlaylistData.items}
                  userIdCurrentlyLoggedIn={this.state.userData.id}
                />
              ) : (
                  <div>
                    <h3>Welcome to MixTape {this.state.userData.display_name}</h3>
                    <p>Click Login Button to Begin!</p>
                  </div>
                )}
              <span
                onClick={() => window.location = 'http://localhost:8888/login'}
                className="btn btn-secondary"
                role="button"
                tabIndex="0">
                Login to Spotify
          </span>
            </Card>
          </Col>
          <Col size="md-4">
            <Card heading="Choose Playlists">
              {this.state.selectedSendingPlaylistDetails ? (
                <div>
                  <h3>Select Public Playlist</h3>
                </div>
              ) : (
                  <div>
                  </div>
                )}
              {this.state.selectedSendingPlaylistDetails ? (
                <div>
                <SearchForm
                  description={this.state.receivingPlaylist.name}
                  placeholder="Public Playlist URI"
                  buttonText="Submit"
                  value={this.state.search}
                  handleInputChange={this.handleInputChange}
                  name="search"
                  handleFormSubmit={this.handleReceivingPlaylistSubmit}
                />
                <List>
                {this.state.userPlaylists.map(item => (
                  <ListItem key={item.id}>
                    <div style={{display: item.owner.id === this.state.userData.id ? 'none' : '' }}>
                        <strong>
                          {item.name}
                        </strong>
                      <SelectBtn onClick={() => this.handleReceivingPlaylistSubmitLink(item.id)} />
                    </div>
                  </ListItem>
                ))}
              </List>
                </div>
              ) : (
                  <div>
                    <h3>Select Your Playlist</h3>
                  </div>
                )}
              <SearchForm
                description={this.state.selectedSendingPlaylistDetails.name}
                placeholder="Personal Playlist URI"
                buttonText="Submit"
                value={this.state.selectedSendingPlaylistSearch}
                handleInputChange={this.handleInputChange}
                name="selectedSendingPlaylistSearch"
                handleFormSubmit={this.handleSendingPlaylistSubmit}
              />
              <h4>Your personal playlists</h4>
                <List>
                {this.state.userPlaylists.map(item => (
                  <ListItem key={item.id}>
                    <div style={{display: item.owner.id === this.state.userData.id ? '' : 'none' }}>
                        <strong>
                          {item.name}
                        </strong>
                      <SelectBtn onClick={() => this.handleSendingPlaylistSubmitLink(item.id)} />
                    </div>
                  </ListItem>
                ))}
              </List>
            </Card>
            <Card heading="Banished">
              <List>
                {this.state.banishedSongs.map(banishedTrack => (
                  <ListItem key={banishedTrack._id}>
                      <strong>
                        {banishedTrack.title} by {banishedTrack.artists}
                      </strong>
                    <DeleteBtn onClick={() => this.deleteSong(banishedTrack._id)} />
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

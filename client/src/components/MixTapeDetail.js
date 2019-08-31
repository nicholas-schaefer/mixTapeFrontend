import React from "react";
import SpotifyPlayer from 'react-spotify-player';

function MixTapeDetail(props) {
  // CSS for hiding songs already in our database
  const hideStyle = {
    display: 'none',
    // margin: '40px',
    // border: '5px solid blue'
  };
  const showStyle = {
    // display: 'show',
    margin: '40px',
    border: '5px solid pink'
  };

  //CSS for Spotify Players
  const size = {
    width: '100%',
    height: 80,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'
  return (
    <div className="text-center">
      {/* {console.log(props.results.items)} */}
      {console.log(props.trackInDatabase)}
      {console.log(props.trackInReceivingDatabase)}
      {props.results.items.map(result => (
        <div
          key={result.track.uri}
          style={
            (props.trackInDatabase.some(e => e.trackId === result.track.uri)) || (props.trackInReceivingDatabase.some(e => e.track.uri === result.track.uri))
            ? hideStyle
            : showStyle
            }>
          {/* <p>Test ={(props.trackInReceivingDatabase.some(e => e.track.uri === result.track.uri)) ? 'In Database' : 'Ok'}</p>
          <p>Test ={(props.trackInDatabase.some(e => e.trackId === result.track.uri)) ? 'hide' : 'show'}</p>
          <h3>Title: {result.track.name}</h3>
          <h3>URI: {result.track.uri}</h3>
          <h3>Spotify Urls: {result.track.external_urls.spotify}</h3>
           <h3>userIdCurrentlyLoggedIn {props.userIdCurrentlyLoggedIn}</h3>
           <h3>Test ={(props.trackInDatabase.some(e => e.userId === props.userIdCurrentlyLoggedIn)) ? 'True' : 'False'} </h3> */}
          <SpotifyPlayer
            // uri={result.track.external_urls.spotify}
            uri={result.track.uri}
            size={size}
            view={view}
            theme={theme}
          />
          <span
            onClick={() => { props.onClickActionBan(result.track) }}
            className="btn btn-danger"
            role="button"
            tabIndex="0">
            Banish
          </span>
          <span
            onClick={() => { props.onClickActionSave(result.track) }}
            className="btn btn-primary"
            role="button"
            tabIndex="0">
            Save
          </span>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default MixTapeDetail;
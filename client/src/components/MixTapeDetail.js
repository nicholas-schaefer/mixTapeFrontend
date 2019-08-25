import React from "react";
import SpotifyPlayer from 'react-spotify-player';

function MixTapeDetail(props) {
  const size = {
    width: '100%',
    height: 80,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'white'; // or 'white'
  return (
    <div className="text-center">
      {console.log(props.results.items)}
      {props.results.items.map(result => (
        <div key={result.track.uri}>
          {/* <h3>Title: {result.track.name}</h3>
          <h3>URI: {result.track.uri}</h3>
          <h3>Spotify Urls: {result.track.external_urls.spotify}</h3> */}
          <SpotifyPlayer
            uri={result.track.external_urls.spotify}
            size={size}
            view={view}
            theme={theme}
          />
          <span 
            onClick={()=> {props.onClickAction(result.volumeInfo)}}
            className="btn btn-danger"
            role="button"
            tabIndex="0">
            Banish
          </span>
          <span 
            onClick={()=> {props.onClickAction(result.volumeInfo)}}
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
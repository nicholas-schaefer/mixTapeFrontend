import React from "react";

function BookDetail(props) {
  return (
    <div className="text-center">
      {props.results.map(result => (
        <div key ={result.id}>
          <h3>Title: {result.volumeInfo.title}</h3>
          <h3>Author: {result.volumeInfo.authors}</h3>
          <h3>Publisher: {result.volumeInfo.publisher}</h3>
          <h3>Published Date: {result.volumeInfo.publishedDate}</h3>
          <h3>ISBN: {(result.volumeInfo.industryIdentifiers[1] == null) ? 'undefined' : result.volumeInfo.industryIdentifiers[1].identifier}</h3>
          <h3><a href={result.volumeInfo.canonicalVolumeLink} target ="blank">More Info</a></h3>
          <span 
            onClick={()=> {props.onClickAction(result.volumeInfo)}}
            className="btn btn-secondary"
            role="button"
            tabIndex="0">
            SAVE ME
          </span>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default BookDetail;
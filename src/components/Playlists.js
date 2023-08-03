// Playlists.js 
import React from 'react'
import '../index.css'

const Playlists = ({playlistData}) => {
    return (
        <div>
            {/* RATE YOUR PLAYLIST TRACKS: */}
            {/* fetch and display users playlists from spotify API */}
            {/* playlist = image, onclicking the image, display users tracks in that playlist from spotify API */}
            {/* show slider for rating next to each track + submit button */}
            {/* submit button sends create query to RATINGS table in db using {musicID, userID, rating} */}
            {/* db table should check for userID and sort track ratings in ascending order */}
            {/* db logic --> if query for pk (userID+musicID) matches existing key in db, then send the query as an UPDATE instead of CREATE */}

            {/* VIEW YOUR RATINGS: */}
            {/* if user has no ratings, display: Rate your playlist tracks... else: */}
            {/* onclick --> RETREIVE all track ratings from userID */}
            {/* UPDATE/DELETE ratings option (slider for update, button for delete) */}

        <h1>Rate your playlist tracks: </h1>
        {playlistData && playlistData.items.length > 0 ? (
            playlistData.items.map((playlistItem, index) =>
                <div key={index}>
                    <p>{index+1}: {playlistItem.name}</p>
                </div>
            )   
        ) : (<p>You need to add or create a playlist on spotify</p>)}

      </div>
    );
};

export default Playlists;

/*
<>
      {showTopTracks && topTracks && topTracks.items.length > 0 ? (
        topTracks.items.map((track, index) => (
          <div key={index}>
          <p>#{index + 1}: {track.name} | artist: {track.artists[0].name}</p>
          </div>
        ))
      ) : null}
    </>
    */
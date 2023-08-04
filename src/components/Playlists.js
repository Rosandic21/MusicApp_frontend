// Playlists.js 
//import '../index.css'
import axios from 'axios';
import {React, useState} from 'react';

const Playlists = ({playlistData, accessToken}) => {

    const [tracks, setTracks] = useState(null);

    const showPlaylistTracks = async(playlistItemsArray) => {
        try{
            const response = await axios.get(playlistItemsArray.tracks.href, {
                headers: {
                    Authorization: `Bearer  ${accessToken}`
                }
            });
            const tracks = response.data;
            console.log("Playlist Tracks: ", tracks);
            setTracks(tracks);
            } catch(error){
                console.log("Error retrieving tracks for playlist: ", error);
                setTracks(null);
            }
        };

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

        {/* shows playlists as clickable <p>playlist names</p> */}
        <h1>Rate your playlist tracks: </h1> 
        {playlistData && playlistData.items.length > 0 ? ( 
            playlistData.items.map((playlistItem, index) =>
                <div key={index}>
                    <p className="cursor-pointer underline text-blue-500 hover:text-blue-700" onClick={() => showPlaylistTracks(playlistItem)}>{index+1}: {playlistItem.name}</p>
                </div>
            )   
        ) : (<p>You need to add or create a playlist on spotify</p>)}

        {/* after playlist gets clicked, state of tracks updates and tracks get displayed below: */}
        {tracks && tracks.items.map((trackItemArray,index) =>
            <p key={index}>
               <b>{trackItemArray.track.name}</b>
               <p>by {trackItemArray.track.artists[0].name}</p>
            </p>
            )} 
      </div>
    );
};

export default Playlists;

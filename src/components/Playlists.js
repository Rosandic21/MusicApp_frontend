// Playlists.js 
//import '../index.css'
import axios from 'axios';
import {React, useState} from 'react';
import RatingComponent from './RatingComponent'; // shows 1-5 stars for users to rate tracks

const Playlists = ({playlistData, accessToken, userID}) => {

    const [tracks, setTracks] = useState(null);
    const [showTracks, setShowTracks] = useState(false);

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

        {/* shows playlists as clickable <p>playlist names</p>. Update showTracks state */}
            <div className="flex">
                <div className="showPlaylists w-50 flex-col align-items-start">
                    <h1 className="mt-20">Rate your playlist tracks: </h1> 
                    {playlistData && playlistData.items.length > 0 ? ( 
                        playlistData.items.map((playlistItem, index) =>
                            <div key={index}>
                                <p className="font-semibold cursor-pointer underline text-blue-500 hover:text-blue-700" onClick={ () => {showPlaylistTracks(playlistItem); setShowTracks(!showTracks)} }>{index+1}: {playlistItem.name}</p>
                            </div>
                        )   
                    ) : (<p>You need to add or create a playlist on spotify</p>)}
                </div>

                {/* after playlist gets clicked, state of tracks updates and tracks get displayed. 
                showTracks included in conditional render to allow for showing/hiding of content onClick (where showTracks state changes) */}
                {showTracks && tracks && ( // only display div className="showTracks" when tracks are actually displayed.
                <div className="showTracks bg-teal-100 border-2 border-grey-500 w-50 max-h-96 overflow-y-auto flex-col items-center mt-20 ml-20 p-4">
                    {showTracks && tracks && tracks.items.map((trackItemArray,index) =>
                        <div className="ratingBox bg-white border-2 mt-2"key={index}>
                            <b>{trackItemArray.track.name}</b>
                            <p>by {trackItemArray.track.artists[0].name}</p>
                            <RatingComponent userID={userID} musicID={trackItemArray.track.external_urls.spotify} title={trackItemArray.track.name} artist={trackItemArray.track.artists[0].name}/>
                        </div>
                    )} 
                </div>
                )}
            </div>
        </div>
    );
};

export default Playlists;

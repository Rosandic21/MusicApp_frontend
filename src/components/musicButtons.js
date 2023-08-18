import React from 'react'
import '../index.css'

/**
 * Generates buttons to toggle display of users most listened to artists and tracks
 * @param {function} getTopTracks - event handler to fetch user's most listened to tracks from spotify API 
 * @param {function} setShowTopTracks - state updater function used to toggle display of top tracks
 * @param {function} getTopArtists - event handler to fetch user's most listened to artists from spotify API 
 * @param {function} setShowTopArtists - state updater function used to toggle display of top artists
 * @param {boolean} showTopArtists - state which determines whether top artists are currently displayed
 * @param {boolean} showTopTracks - state which determines whether top tracks are currently displayed
 * @param {string} accessToken - accessToken used to make requests to Spotify API
 * @return {JSX.Element} - the MusicButtons React component
 */
const MusicButtons = ({ getTopTracks, setShowTopTracks, getTopArtists, setShowTopArtists, showTopArtists, showTopTracks, accessToken }) => {
    return (
        <div className="musicContainer">
            <button type="button" className="blueButton" id="artistsButton" onClick={() => {getTopArtists(accessToken); setShowTopArtists(!showTopArtists);}}>
                {showTopArtists ? 'Hide top artists' : 'Show top artists'}
            </button>

            <button type="button" className="blueButton" id="tracksButton" onClick={() => {getTopTracks(accessToken); setShowTopTracks(!showTopTracks);}}>
             {showTopTracks ? 'Hide top songs' : 'Show top songs'}
            </button>
        </div>
    )
}

export default MusicButtons;
import React from 'react'
import '../index.css'

const MusicButtons = ( { getTopTracks, setShowTopTracks, getTopArtists, setShowTopArtists, showTopArtists, showTopTracks, accessToken }) => {
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
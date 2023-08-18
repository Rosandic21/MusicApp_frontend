// TopTracks.js
import React from 'react';
import '../index.css';

/**
 * Shows users top tracks with the corresponding artist 
 * @param {boolean} showTopTracks - state which determines whether top tracks are currently displayed
 * @param {object} topTracks - contains data of user's most listened to tracks
 * @returns {JSX.Element} - TopTracks React component 
 */
const TopTracks = ({ showTopTracks, topTracks  }) => {
  return (
    <div className="show_top_tracks text-slate-300 drop_down_text">
      {showTopTracks && topTracks && topTracks.items.length > 0 ? (
        topTracks.items.map((track, index) => (
          <div key={index}>
          <p>#{index + 1}: {track.name} | artist: {track.artists[0].name}</p>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default TopTracks;

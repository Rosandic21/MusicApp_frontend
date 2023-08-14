// TopTracks.js: shows users top tracks with the corresponding artist 
import React from 'react';
import '../index.css';
const TopTracks = ({ showTopTracks, topTracks  }) => {
  return (
    <div className="mt-10">
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

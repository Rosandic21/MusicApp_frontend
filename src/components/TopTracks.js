// TopTracks.js
import React from 'react';

const TopTracks = ({ showTopTracks, topTracks  }) => {
  return (
    <>
      {showTopTracks && topTracks && topTracks.items.length > 0 ? (
        topTracks.items.map((track, index) => (
          <div key={index}>
          <p>#{index + 1}: {track.name} | artist: {track.artists[0].name}</p>
          </div>
        ))
      ) : null}
    </>
  );
};

export default TopTracks;

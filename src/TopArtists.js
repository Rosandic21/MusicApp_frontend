// TopArtists.js
import React from 'react';

const TopArtists = ({ showTopArtists, setShowTopArtists, topArtists, getTopArtists, accessToken }) => {
  return (
    <div>
      {showTopArtists && topArtists && topArtists.items.length > 0 && (
        topArtists.items.map((artist, index) => (
          <div key={index}>
            <p>artist: {artist.name}</p>
            {artist.images.length >= 3 && (
              <img src={artist.images[2].url} alt="Artist" />
            )}
          </div>
        ))
      )}
    </div>
  ); 
};

export default TopArtists;

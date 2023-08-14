// TopArtists.js
import React from 'react';
import '../index.css';

const TopArtists = ({ showTopArtists, setShowTopArtists, topArtists, getTopArtists, accessToken }) => {
  return (
    <div className="flex space-x-8 mt-10">
      {showTopArtists && topArtists && topArtists.items.length > 0 && (
        topArtists.items.map((artist, index) => (
          <div className="flex flex-col items-center align-items-start mt-auto" key={index}>
              <p className="Artist text-lg font-bold text-center text-sky-500"> {artist.name}</p>
            {artist.images.length >= 3 && (
              <div className="flex items-center mt-auto">
              <img src={artist.images[2].url} alt="Artist" className="border-4 border-sky-500 w-32 h-32" />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  ); 
};

export default TopArtists;

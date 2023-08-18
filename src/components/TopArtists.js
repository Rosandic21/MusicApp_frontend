// TopArtists.js
import React from 'react';
import '../index.css';

/**
 * Map through all of users topArtists to display their image and name
 * @param {boolean} showTopArtists - state which determines whether top artists are currently displayed
 * @param {object} topArtists - contains data of user's most listened to artists
 * @returns {JSX.Element} - TopArtists React component
 */
const TopArtists = ({ showTopArtists, topArtists }) => {
  return (
    <div className="flex space-x-8 drop_down_text">
      {showTopArtists && topArtists && topArtists.items.length > 0 && (
        topArtists.items.map((artist, index) => (
          <div className="flex flex-col items-center align-items-start mt-auto" key={index}>
              <p className="Artist text-lg font-bold text-center text-sky-500"> {artist.name}</p> {/* artist name */}
            {artist.images.length >= 3 && (
              <div className="flex items-center mt-auto">
              <img src={artist.images[2].url} alt="Artist" className="border-4 border-sky-500 w-32 h-32" /> {/* image of artist */}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  ); 
};

export default TopArtists;

// NewReleases.js
import React from 'react';
import Slider from 'react-slick';
import carouselSettings from '../carousel';

/**
 * UI to display new music releases
 * @param {function} newReleasesData - fetches newly released albums/tracks from Spotify API
 * @returns {JSX.Element} - NewReleases React component
 */
const NewReleases = ({ newReleasesData }) => {
  return (
    <div className="text-center mt-10">
      <b className="introText shadow-xl text-3xl font-bold border-4 p-3">Explore new releases </b>
      {/* Conditional rendering based on whether new releases data is available */}
      {newReleasesData.albums.items.length > 0 ? (
        <div className="slider-wrapper">
          {/* Slider component with custom settings */}
          <Slider {...carouselSettings}>
            {/* Mapping through each newly released item */}
            {newReleasesData.albums.items.map((eachReleasedItem, index) => (
              <div key={index} className="release-card">
                <img src={eachReleasedItem.images[1].url} alt="Album cover img" className="slider-image ml-4" /> {/* Displaying artist name */}
                    <p className="text-xl font-semibold text-white">Artist: {eachReleasedItem.artists[0].name}</p> {/* Displaying artist name */}
                    <p className="text-base text-gray-400">Title: {eachReleasedItem.name}</p>  {/* Displaying track/album title */}
                    {/* Displaying total tracks if more than one */}
                    {eachReleasedItem.total_tracks > 1 && ( 
                      <p className="text-sm text-gray-400">Total Tracks: {eachReleasedItem.total_tracks}</p>
                    )}
                    <p className="text-sm text-gray-400">Release Date: {eachReleasedItem.release_date}</p> {/* Display release date */}
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p>waiting on data</p>
      )}
    </div>
  );
};

export default NewReleases;

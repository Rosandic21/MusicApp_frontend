// NewReleases.js
import React from 'react';
import Slider from 'react-slick';
import carouselSettings from './carousel';

const NewReleases = ({ newReleasesData }) => {
  return (
    <div>
      <b id="introText">Explore new releases: </b>
      {newReleasesData.albums.items.length > 0 ? (
        <div className="slider-wrapper">
          <Slider {...carouselSettings}>
            {newReleasesData.albums.items.map((eachReleasedItem, index) => (
              <div key={index}>
                <img src={eachReleasedItem.images[1].url} alt="Album cover img" className="slider-image" />
                    <p>Artist Name: {eachReleasedItem.artists[0].name}</p>
                    <p>Title: {eachReleasedItem.name}</p>
                    <p>Type: {eachReleasedItem.album_type}</p>
                    {eachReleasedItem.total_tracks > 1 && (
                      <p>Total Tracks: {eachReleasedItem.total_tracks}</p>
                    )}
                    <p>Release Date: {eachReleasedItem.release_date}</p>
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

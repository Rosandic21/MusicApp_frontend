import {React, useState, useEffect} from 'react';
import axios from 'axios'; 
//import Form from 'react-bootstrap/form'
import './index.css';
import Slider from 'react-slick';
import carouselSettings from './carousel';
//import embeddedPlayer from './iFrameEmbed';


export const HomePage = () => {
const [userData, setUserData] = useState(null);
const [topArtists, setTopArtists] = useState(null);
const [topTracks, setTopTracks] = useState(null);
const [newReleasesData, setNewReleases] = useState(null);
const [showTopArtists, setShowTopArtists] = useState(false);
const [showTopTracks, setShowTopTracks] = useState(false);

    // Parse URL for accessToken, time accessToken expires, and refreshToken.
   const queryParams = new URLSearchParams(window.location.search)
   const accessToken = queryParams.get("access_token")
   //const expires_in = queryParams.get("expires_in")
   //const refresh_token = queryParams.get("refresh_token")

  // retrieval of user data
   const getUserData = async (accessToken) => {
    try{
        const response = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    const userData = response.data;
    console.log('UserData: ', userData);
    setUserData(userData);
   }    catch (error){
            console.error('Error retrieving user data', error);
            setUserData(null);
        }
   };

   //embeddedPlayer();

   // call getUserData when the component mounts
   useEffect(() => {
     if(accessToken) {
       getUserData(accessToken);
       getNewReleases(accessToken);
     }
     }, [accessToken]); // re-render if accessToken changes state
     
  // get users most listened to artists 
  const getTopArtists = async(accessToken, term) => {
    try{
      const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
      });
    const topArtists = response.data;
    console.log("Top artists: ", topArtists);
    setTopArtists(topArtists);
    } catch(error){
      console.log('Error retrieving top artists', error);
      setTopArtists(null);
    }
  }
  
  // get users most listened to songs 
  const getTopTracks = async (accessToken) => { 
    try{
      const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
      }); 
    const topTracks = response.data;
    console.log("topTracks: ", topTracks);
    setTopTracks(topTracks);
    } catch(error){
      console.log("Error retrieving top tracks: ", error);
      setTopTracks(null);
    }
  }
  
  // get data on new album releases
  const getNewReleases = async (accessToken) => {
    try{
      const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases?country=US&limit=20&offset=0`, {
        headers: {
          Authorization: `Bearer  ${accessToken}`
        }
      });
      const newReleasesData = response.data;
      console.log("New releases: ", newReleasesData);
      setNewReleases(newReleasesData);
    } catch(error){
      console.log("Error getting new releases: ", error);
      setNewReleases(null);
    }
  }


  return (
    <div>
    {userData ? (
      <>
        <p id="introText">Hello, {userData.display_name}!</p>
            {newReleasesData ? (
            <>
            <b id="introText">Explore new releases: </b>
            {newReleasesData.albums.items.length > 0 && (
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
            )}
              </>
            
            
            ) : (<p>waiting on data</p>)
            } 
        <div className="musicContainer">
        <p className="pShadow">Checkout your Spotify wrapped!</p>
        <button type="button" class="blueButton" id="artistsButton" onClick={() => {getTopArtists(accessToken); setShowTopArtists(!showTopArtists);}}>
          {showTopArtists ? 'Hide top artists' : 'Show top artists'}
        </button>
        <button type="button" class="blueButton" id="tracksButton" onClick={() => {getTopTracks(accessToken); setShowTopTracks(!showTopTracks);}}>
          {showTopTracks ? 'Hide top songs' : 'Show top songs'}
        </button>  
        </div>
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
        {showTopTracks && topTracks && topTracks.items.length > 0 && (
          topTracks.items.map((track, index) => (
            <div key={index}>
              <p>
                #{index + 1}: {track.name} | artist: {track.artists[0].name}
              </p>
            </div>
          ))
        )}
      </>
    ) : (
      <p>Loading data...</p>
    )}
    </div>
  );
    }
export default HomePage;

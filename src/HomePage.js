// HomePage.js 
import {React, useState, useEffect} from 'react';
import axios from 'axios'; 
import './index.css';
import UserInfo from './components/UserInfo';
import NewReleases from './components/NewReleases';
import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';
import MusicButtons from './components/musicButtons';
import Playlists from './components/Playlists';
import ModifyRatings from './components/ModifyRatings';
import ContactUs from './components/ContactForm';

export const HomePage = () => {
const [userData, setUserData] = useState(null);
const [topArtists, setTopArtists] = useState(null);
const [topTracks, setTopTracks] = useState(null);
const [newReleasesData, setNewReleases] = useState(null);
const [playlistData, setPlaylistData] = useState(null);
const [showTopArtists, setShowTopArtists] = useState(false);
const [showTopTracks, setShowTopTracks] = useState(false);
const [emailSent, setEmailSent]= useState(false); // passed as a prop for use in ContactForm.js 

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
    getPlaylists(accessToken, userData.id);  // use userID to get playlists
   }    catch (error){
            console.error('Error retrieving user data', error);
            setUserData(null);
        }
   };
     
  // get users most listened to artists 
  const getTopArtists = async(accessToken) => {
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

  // get user playlists
  const getPlaylists = async (accessToken, user_id) => {
    try{
      const response = await axios.get(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
       headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const playlistData = response.data;
      console.log("Playlists: ", playlistData);
      setPlaylistData(playlistData);
    } catch(error){
      console.log("Error getting user playlists: ", error);
      setPlaylistData(null);
    }
  }
 

  // get spotify api data when the component mounts
  useEffect(() => {
    if(accessToken) {
      getUserData(accessToken);
      getNewReleases(accessToken);
      getTopArtists(accessToken);
      getTopTracks(accessToken);
    }
    // disable warning for getUserData missing in dependency array (UserData should never change past first render):
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]); // re-render if accessToken changes state


  return (
    <div> 
      {/* conditional render to ensure data is loaded for processing/display */}
      {(userData && newReleasesData && topArtists && topTracks) ? (
        <> {/* pass the props necessary for each component to process/display associated data */}
          <div className="homepage_top pb-10">
            <UserInfo userData={userData} />
            <div className="welcome_border border-solid border-6 border rounded-full border-sky-600 ml-2 mr-2 bg-gradient-to-r from-pink-500 to-violet-500">
              <p className="welcome_msg ml-7 mr-5 mt-2 mb-2 text-white"> Welcome to SonicStudios! This site uses data associated with your spotify to offer you a number of features
                  spotify doesn't give you access to. Here, we keep an up to date list of brand new music releases, allow you to see 
                  your most listened to artists and songs, and we even let you save lists of how you rate each song on your playlists. 
                  SonicStudios gives you more ways to express how you enjoy music!
              </p>
            </div>
            <NewReleases newReleasesData={newReleasesData} /> 
            <MusicButtons getTopTracks={getTopTracks} setShowTopTracks={setShowTopTracks} getTopArtists={getTopArtists} setShowTopArtists={setShowTopArtists} showTopArtists={showTopArtists} showTopTracks={showTopTracks} accessToken={accessToken}  />
            <TopArtists showTopArtists={showTopArtists} topArtists={topArtists} />
            <TopTracks showTopTracks={showTopTracks} topTracks={topTracks} />
          </div>
          <div className="homepage_middle pb-5 pt-5">
            <Playlists playlistData={playlistData} accessToken={accessToken} userID={userData.id}/>
          </div>
          <div className="homepage_bottom flex justify-between">
            <div className="pt-5 pl-2 pb-3">
              <ModifyRatings userID={userData.id}/>
            </div>
            <div className="msg">
              {emailSent && <p className="absolute text-2xl ml-20 mt-5 font-bold text-white">Message sent!</p>} {/* display 'Message sent' after email is sent */}
              <div className="p-2 m-20 border-2 bg-indigo-700">
                <ContactUs emailSent={emailSent} setEmailSent={setEmailSent}/>
              </div>
            </div>
          </div>
        </>
      ) : <p>Loading data...</p>
    }
    </div>
  );

};

export default HomePage;

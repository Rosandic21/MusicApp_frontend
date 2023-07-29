import {React, useState, useEffect} from 'react';
import axios from 'axios'; 
//import Form from 'react-bootstrap/form'

export const HomePage = () => {
const [userData, setUserData] = useState(null);
const [topArtists, setTopArtists] = useState(null);
const [topTracks, setTopTracks] = useState(null);
//const [showTopArtists, setShowTopArtists] = useState(false);
//const [showTopTracks, setShowTopTracks] = useState(false);

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

   // call getUserData when the component mounts
   useEffect(() => {
     if(accessToken) getUserData(accessToken);
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
  const getTopTracks = async (accessToken) => { // *****************TODO: print ${artist}: ${name}
    try{
      const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10`, {
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
   
  //if(accessToken) getTopTracks(accessToken)

  //const getTopTracks = 
  //https://api.spotify.com/v1/me/top/tracks
   
    // return (
    //     <div>
    //       <h1>Test</h1>
    //       <button type="button" onClick={() => getUserData(accessToken)}>Fetch my data</button>
    //       <h2>Home Page with Query Parameters:</h2>
    //       {userData && ( // conditional rendering statement to check if userData is not null and is true
    //         <div>
    //           <h3>User Data:</h3>
    //           <p>Name: {userData.display_name}</p>
    //           {/* Add other user data fields as needed */}
    //         </div>
    //       )}
    //     </div>
    //   );
    // }


    return (
      <div>
        {userData ? (
          <>
            <p>Hello, {userData.display_name}!</p>
            <p>Checkout your spotify wrapped!</p> 
            <button type="button" id="artistsButton" onClick={() => getTopArtists(accessToken)}>My top artists</button> <t></t>
            <button type="button" id="tracksButton" onClick={() => getTopTracks(accessToken)}>My top songs</button>
            {topArtists && topArtists.items.length > 0 && (
              topArtists.items.map((artist, index) => (
                <div key={index}>
                  <p>artist: {artist.name}</p>
                  {artist.images.length >= 3 && (
                    <img src={artist.images[2].url} alt="Artist" />
                  )}
                </div>
              ))
            )}
            {topTracks && topTracks.items.length > 0 && (
              topTracks.items.map((tracks, index) => (
                <div key={index}>
                  <p>
                    #{index+1}: {tracks.name} | artist: {tracks.artists[0].name}
                  </p> 
                </div>
              )
              )
            )}
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );


    // return (
    //     <div>
    //       {userData ? (
    //         <>
    //           <p>Hello, {userData.display_name}!</p>
    //           <p>Checkout your spotify wrapped!</p>
    //           {topArtists && topArtists.items.length > 0 && (
    //             topArtists.items.map((artist, index) => (
    //               <div key={index}>
    //                 <p>{artist.name}</p>
    //                 {artist.images.length >= 3 && (
    //                   <img src={artist.images[2].url} alt="Artist" />
    //                 )}
    //               </div>
    //             ))
    //           )}
    //         </>
    //       ) : (
    //         <p>Loading data...</p>
    //       )}
    //     </div>
    //   );
      

    //   <div>
    //   {userData ? (
    //     <>
    //       <p>Hello, {userData.display_name}!</p>
    //       <p>Checkout your spotify wrapped!</p>
    //       {topArtists && topArtists.items.length > 0 && topArtists.items[0].images.length >= 3 && (
    //         <div>
    //         <p>{topArtists.items[0].name}</p>
    //           <img src={topArtists.items[0].images[2].url} alt="Artist" />
    //           </div>
    //       )}
    //     </>
    //   ) : (
    //     <p>Loading data...</p>
    //   )}
    // </div>
    // )
  }


 /* <FormControl 
        type="text"
        placeholder="Post Malone, Travis Scott, Drake, Beyonce, Kanye West"
        onChange={}
        </Form>
        
        </div>
    ) */
export default HomePage;

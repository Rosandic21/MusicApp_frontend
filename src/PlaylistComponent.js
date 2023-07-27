import React, { useEffect, useState } from "react";
import axios from "axios";

const PlaylistComponent = () => {
  const [playlists, setPlaylists] = useState([]);
  const token = "YOUR_ACCESS_TOKEN"; // Replace this with the actual access token

  useEffect(() => {
    // Define the backend API URL
    const apiUrl = `http://localhost:5000/playlist/${token}`;

    // Make the API request to your backend
    axios
      .get(apiUrl)
      .then((response) => {
        // Update the state with the fetched playlists
        setPlaylists(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, [token]);

  return (
    <div>
      <h2>Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistComponent;

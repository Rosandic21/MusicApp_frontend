const embeddedPlayer = (onReadyCallback, onErrorCallback) => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };
      const callback = (EmbedController) => {
        // You can add additional callback logic here if needed.
      };
      IFrameAPI.createController(element, options, callback);
      onReadyCallback(); // Call the onReadyCallback when the player is ready
    };
  
    // Load the Spotify iFrame API script
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed-podcast/iframe-api/v1';
    script.async = true;
    script.onerror = () => onErrorCallback('Failed to load Spotify iFrame API script');
    document.body.appendChild(script);
  };
  
  export default embeddedPlayer;
  
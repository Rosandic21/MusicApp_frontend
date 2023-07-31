import React from 'react'

export const Login = () => {
    const redirectToLogin = () => {
        // Redirect the user to the login URL
        window.location.href = 'http://localhost:5000/login';
    }
   return(
    <div>
        <h1>Welcome to SpotifyRemixed!</h1>
        <b>This site offers a bundle of features in a way Spotify just doesn't</b>
        <p>Click the button and login with Spotify to get started:</p>
        <button type="button" className="blueButton" onClick={redirectToLogin}>Login</button>
    </div>
   )};

   export default Login;
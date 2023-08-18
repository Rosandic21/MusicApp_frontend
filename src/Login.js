// Login.js: UI for Login page 
import React from 'react'
import './index.css'

export const Login = () => {
    const redirectToLogin = () => {
        // Redirect the user to the login URL
        window.location.href = 'http://localhost:5000/login';
    }
   return(
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center items-center h-screen mb-4 text-white">
        <h1 className="font-bold text-2xl text-center mb-4">Welcome to SpotifyRemixed!</h1>
        <b className="text-center mb-4">This site offers a bundle of features in a way Spotify just doesn't</b>
        <p className="text-center mb-4">Click the button and login with Spotify to get started:</p>
        <button type="button mb-4" className="blueButton bounce_button text-center mt-4" onClick={redirectToLogin}>Login</button>
    </div>
   )};

   export default Login;
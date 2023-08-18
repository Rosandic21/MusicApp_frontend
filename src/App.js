import React from 'react' 
import Login from "./Login"
import HomePage from './HomePage'

const accToken = new URLSearchParams(window.location.search).get("access_token");

function App() {
  // render login/homepage components based on truthy/false value of accesstoken
  return accToken ? <HomePage accToken={accToken} /> : <Login />; 
};
    
export default App

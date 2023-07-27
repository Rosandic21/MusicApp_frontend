import {React} from 'react';

export const HomePage = () => {

    // Parse URL for accessToken, time accessToken expires, and refreshToken.
   const queryParams = new URLSearchParams(window.location.search)
   const accessToken = queryParams.get("access_token")
   const expires_in = queryParams.get("expires_in")
   const refresh_token = queryParams.get("refresh_token")

    return (
        <div>
            <h1>test</h1>
            <h2>Home Page with Query Parameters: {refresh_token}</h2>
       </div>
    )
}

export default HomePage;

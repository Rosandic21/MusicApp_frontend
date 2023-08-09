/* ModifyRatings.js: Allows user to retrieve, update, and/or delete their song ratings from the database
-- ModifyRatings is invoked in HomePage.js (frontend main page)
-- Backend route for get request defined in authRoutes.js
-- Get request is processed in handleRatingRequest.js backend module 
*/

import React from 'react'
import axios from 'axios'

// const retrieveRatings = (userID) => {
//     // Send GET request for saved ratings to backend
//     try{
        
//         //const response = axios.get('http://localhost:5000/getRatings/userID', {
//             const response = axios.get('http://localhost:5000/getRatings/' + userID, {
//             params: {
//                 userID: userID
//             }
//         })
//         console.log(response.data); 
//     } catch (error) {
//         console.error('Error retrieving ratings:', error);
//     }
// }


const retrieveRatings = (userID) => {
//     // Send GET request for saved ratings to backend
//     try {
//         // Send GET request to the server
//         axios.get('http://localhost:5000/getRatings/' + userID)
//             .then(response => {
//                 // Handle the response data here
//                 const data = response.data;
//                 console.log(data);

//                 // Update the UI with the retrieved data
//                 const ratingDiv = document.getElementById('ratings');
//                 ratingDiv.innerHTML = `
//                     <p>Title: ${data.title}</p>
//                     <p>Artist: ${data.artist}</p>
//                     <p>Rating: ${data.rating}</p>
//                 `;
//             }).catch(error => {
//                 console.error('Error retrieving ratings:', error)});
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

try {
    // Send GET request to the server
    axios.get('http://localhost:5000/getRatings/' + userID)
        .then(response => {
            // Handle the response data here
            const result = response.data.result; // Access the entire result array
            console.log(result);

            // Update the UI with the retrieved data
            const ratingDiv = document.getElementById('ratings');
            let html = '';

            // Loop through the result array and generate HTML for each rating
            result.forEach(rating => {
                html += `
                    <p>Title: ${rating.title}</p>
                    <p>Artist: ${rating.artist}</p>
                    <p>Rating: ${rating.rating}</p>
                `;
            });

            ratingDiv.innerHTML = html;
        }).catch(error => {
            console.error('Error retrieving ratings:', error)});
} catch (error) {
    console.error('Error:', error);
}
}



const ModifyRatings = ({ userID }) => {
    

    return (
        <div>
            <button onClick={()=> retrieveRatings(userID)}>Saved ratings</button>
            <div id='ratings'></div>
        </div>
    )
}

export default ModifyRatings;


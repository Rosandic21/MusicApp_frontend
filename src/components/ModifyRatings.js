/* ModifyRatings.js: Allows user to retrieve, update, and/or delete their song ratings from the database
-- ModifyRatings is invoked in HomePage.js (frontend main page)
-- Backend route for get request defined in authRoutes.js
-- Get request is processed in handleRatingRequest.js backend module 
*/

import {React,useState} from 'react'
import axios from 'axios'
import '../index.css'

const retrieveRatings = (userID) => {
try {
    // Send GET request to the server
    axios.get('http://localhost:5000/getRatings/' + userID)
        .then(response => {
            // Handle the response data here
            const result = response.data.result; // Access the entire result array
            console.log(result);

            // Update the UI with the retrieved data
            const ratingDiv = document.getElementById('ratings');
            let html = `<table>
            <th>Title</th> <th>Artist</th> <th>Rating</th>`;            
              result.forEach(rating => {
                html += `
                <tr>
                    <td>${rating.title}</td>
                    <td>${rating.artist}</td>
                    <td>${rating.rating}</td>
                    <td><button id="edit" type="button" class="ml-5 px-2 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">EDIT</button></td>
                    <td><button id="delete" type="button" class="px-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">DEL</button></td>
                </tr>
                `;
            });
              html+=`</table>`
            ratingDiv.innerHTML = html;
        }).catch(error => {
            console.error('Error retrieving ratings:', error)});
} catch (error) {
    console.error('Error:', error);
}
}




const ModifyRatings = ({ userID }) => {
    const [showRatings, setShowRatings] = useState(true);
    return (
        <div>
            <button onClick={()=> {retrieveRatings(userID); setShowRatings(!showRatings)} }>{showRatings ? 'Display saved ratings' : 'Minimize'}</button>
            <div id='ratings'className={`mt-4 ${showRatings ? 'invisible' : 'visible'}`}></div> 
        </div>
    )
}

export default ModifyRatings;


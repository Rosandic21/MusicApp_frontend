import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function ModifyRatings({ userID }) {
    const [showRatings, setShowRatings] = useState(true);
    const [ratings, setRatings] = useState([]);

    async function adjustRating(index, increment) {
        const newRatings = [...ratings];
        const newRating = Math.min(5, Math.max(1, newRatings[index].rating + increment));
        newRatings[index].rating = newRating;
        setRatings(newRatings);
    }

    async function handleEditButtonClick(event, index, userID) {
        const putMusicID = ratings[index].musicID;
        const putNewRating = ratings[index].rating;

        try {
            const response = await axios.put('http://localhost:5000/putRatings', {
                putUserID: userID,
                putMusicID: putMusicID,
                putNewRating: putNewRating
            });

            if (response.status === 200) {
                console.log('\nUpdated track rating\n');
            }
        } catch (error) {
            console.log('Error sending data', error);
        }
    }

    async function retrieveRatings(userID) {
        try {
            const response = await axios.get('http://localhost:5000/getRatings/' + userID);
            setRatings(response.data.result);
        } catch (error) {
            console.error('Error retrieving ratings:', error);
        }
    }

    useEffect(() => {
        retrieveRatings(userID);
    }, [userID]);

    return (
        <div>
            <button onClick={() => { retrieveRatings(userID); setShowRatings(!showRatings) }}>
                {showRatings ? 'Display saved ratings' : 'Minimize'}
            </button>
            <div id='ratings' className={`mt-4 ${showRatings ? 'invisible' : 'visible'}`}>
                <table>
                    <thead>
                        <th>Title</th> <th>Artist</th> <th>Rating</th>
                    </thead>
                    <tbody>
                        {ratings.map((rating, index) => (
                            <tr key={index} data-music-id={rating.musicID}>
                                <td>{rating.title}</td>
                                <td>{rating.artist}</td>
                                <td>
                                    <span className="current-rating">{rating.rating}</span>
                                    <input type="number" className="new-rating hidden" value={rating.rating} min="1" max="5" />
                                    <button className="up-arrow" onClick={() => adjustRating(index, 1)}>▲</button>
                                    <button className="down-arrow" onClick={() => adjustRating(index, -1)}>▼</button>
                                </td>
                                <td><button className="edit-button" type="button" onClick={(event) => handleEditButtonClick(event, index,userID)}>EDIT</button></td>
                                <td><button className="delete-button" type="button">DEL</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModifyRatings;















/* buttons work, put request failed. buttons show proper putNewRating value in payload
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function ModifyRatings({ userID }) {
    const [showRatings, setShowRatings] = useState(true);
    const [ratings, setRatings] = useState([]);

    async function adjustRating(index, increment) {
        const newRatings = [...ratings];
        const newRating = Math.min(5, Math.max(1, newRatings[index].rating + increment));
        newRatings[index].rating = newRating;
        setRatings(newRatings);
    }

    async function handleEditButtonClick(event, index) {
        const putUserID = ratings[index].userID;
        const putMusicID = ratings[index].musicID;
        const putNewRating = ratings[index].rating;

        try {
            const response = await axios.put('http://localhost:5000/putRatings', {
                userID: putUserID,
                musicID: putMusicID,
                newRating: putNewRating
            });

            if (response.status === 200) {
                console.log('\nUpdated track rating\n');
            }
        } catch (error) {
            console.log('Error sending data', error);
        }
    }

    async function retrieveRatings(userID) {
        try {
            const response = await axios.get('http://localhost:5000/getRatings/' + userID);
            setRatings(response.data.result);
        } catch (error) {
            console.error('Error retrieving ratings:', error);
        }
    }

    useEffect(() => {
        retrieveRatings(userID);
    }, [userID]);

    return (
        <div>
            <button onClick={() => { retrieveRatings(userID); setShowRatings(!showRatings) }}>
                {showRatings ? 'Display saved ratings' : 'Minimize'}
            </button>
            <div id='ratings' className={`mt-4 ${showRatings ? 'invisible' : 'visible'}`}>
                <table>
                    <thead>
                        <th>Title</th> <th>Artist</th> <th>Rating</th>
                    </thead>
                    <tbody>
                        {ratings.map((rating, index) => (
                            <tr key={index} data-user-id={rating.userID} data-music-id={rating.musicID}>
                                <td>{rating.title}</td>
                                <td>{rating.artist}</td>
                                <td>
                                    <span className="current-rating">{rating.rating}</span>
                                    <input type="number" className="new-rating hidden" value={rating.rating} min="1" max="5" />
                                    <button className="up-arrow" onClick={() => adjustRating(index, 1)}>▲</button>
                                    <button className="down-arrow" onClick={() => adjustRating(index, -1)}>▼</button>
                                </td>
                                <td><button className="edit-button" type="button" onClick={(event) => handleEditButtonClick(event, index)}>EDIT</button></td>
                                <td><button className="delete-button" type="button">DEL</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModifyRatings;
*/














/* ModifyRatings.js: Allows user to retrieve, update, and/or delete their song ratings from the database
-- ModifyRatings is invoked in HomePage.js (frontend main page)
-- Backend route for get request defined in authRoutes.js
-- Get request is processed in handleRatingRequest.js backend module 
*/
/*
import {React,useState, useEffect} from 'react'
import axios from 'axios'
import '../index.css'





// Function to adjust the rating when arrow buttons are clicked
function adjustRating(button, increment) {
    setRating(prev => Math.min(5, Math.max(1, prev + increment)));  // 2: update state on arrow clicks
    const ratingInput = button.parentNode.querySelector('.new-rating');
    let newRating = parseInt(ratingInput.value) + increment;
    newRating = Math.min(5, Math.max(1, newRating)); // Ensure the rating stays within 1-5 range
    ratingInput.value = newRating;
}

///vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Event handler for edit button click
async function handleEditButtonClick(event) {
    const row = event.target.closest('tr');
    const putUserID = row.getAttribute('data-user-id');
    const putMusicID = row.getAttribute('data-music-id');
    const putNewRating = row.querySelector('.new-rating');

    // Add event listeners for up and down arrow buttons
    const upArrowButton = row.querySelector('.up-arrow');
    upArrowButton.addEventListener('click', () => adjustRating(putNewRating, 1));

    const downArrowButton = row.querySelector('.down-arrow');
    downArrowButton.addEventListener('click', () => adjustRating(putNewRating, -1));

    // 2. handlers on button click:
    upArrow.addEventListener('click', () => adjustRating(1));
  // 2. handler on button click:
  downArrow.addEventListener('click', () => adjustRating(-1));

    // Now you have access to the userID and musicID for the clicked row
    console.log('row:', row);
    console.log('User ID:', putUserID);
    console.log('Music ID:', putMusicID);
    console.log('putNewRating:', putNewRating.value);

    // Rest of your edit button logic here...
    try {
        // Send rating to backend
        const response = await axios.put('http://localhost:5000/putRatings', {
          putUserID: putUserID, 
          putMusicID: putMusicID,
          //putNewRating: putNewRating.value
          putNewating: rating // 2.from state
        })
        if (response.status === 200) {
          console.log('/n Updated track rating /n');
        }
       } catch(error){
          console.log("Error sending data ", error);
        }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



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
            let html = `
            <table>
                <thead>
                  <th>Title</th> <th>Artist</th> <th>Rating</th>
                </thead>
                <tbody>`;            
              result.forEach(rating => {
                html += `
                <tr data-user-id="${rating.userID}" data-music-id="${rating.musicID}">
                    <td>${rating.title}</td>
                    <td>${rating.artist}</td>
                    <td>
                        <span class="current-rating">${rating.rating}</span>
<span>{rating}</span>
                        <input type="number" class="new-rating hidden" value="${rating.rating}" min="1" max="5">
                        <button class="up-arrow">▲</button>
                        <button class="down-arrow">▼</button>
                    </td>
                    <td><button id="update" type="button" class="ml-5 px-2 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">UPDATE</button></td>
                    <td><button id="delete" type="button" class="px-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">DEL</button></td>
                </tr>
                `;
            });
              html+=`</tbody></table>`
            ratingDiv.innerHTML = html;

            //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
             // Add event listeners for edit buttons
             const editButtons = document.querySelectorAll('.edit-button');
             editButtons.forEach(button => {
                 button.addEventListener('click', handleEditButtonClick);
             });
             //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


        }).catch(error => {
            console.error('Error retrieving ratings:', error)});
} catch (error) {
    console.error('Error:', error);
}
}








const ModifyRatings = ({ userID }) => {
    const [showRatings, setShowRatings] = useState(true);
        // 2: Track rating value in state
        const [rating, setRating] = useState(0); 


    return (
        <div>
            <button onClick={()=> {retrieveRatings(userID); setShowRatings(!showRatings)} }>{showRatings ? 'Display saved ratings' : 'Minimize'}</button>
            <div id='ratings'className={`mt-4 ${showRatings ? 'invisible' : 'visible'}`}></div> 
        </div>
    )
}

export default ModifyRatings;

/*
result.forEach(rating => {
                html += `
                <tr>
                    <td>${rating.title}</td>
                    <td>${rating.artist}</td>
                    <td>${rating.rating}</td>
                    <td><button id="update" type="button" class="ml-5 px-2 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">UPDATE</button></td>
                    <td><button id="delete" type="button" class="px-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">DEL</button></td>
                </tr>
                `;
            });
*/


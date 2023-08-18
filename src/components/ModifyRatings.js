// ModifyRatings.js: Provides an expandable table which displays title, artist, rating info. for user to see existing ratings or make rating changes.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

/** 
* Displays an interface for user to check/modify ratings stored in DB
* @param {string} userID - unique spotify API userID 
* @returns {JSX.Element} - the ModifyRatings.js React component
*/
function ModifyRatings({ userID }) {
    const [showRatings, setShowRatings] = useState(false); // manages display toggle of ratings table
    const [ratings, setRatings] = useState([]); // manages display of ratings within the table
    const [ratingEdited, setRatingEdited] = useState(false); // manages display msg when a rating is updated
    const [ratingDeleted, setRatingDeleted] = useState(false); // manages display msg when a rating deletion occurs


/** 
* Handles logic for RATING column in table which allows updates to be made to rating
* @param {number} index - the index of the rating in the ratings array
* @param {number} increment - the amount to increment/decrement the rating
*/
    async function adjustRating(index, increment) {
        // create a copy of ratings array to make updates to while avoiding mutating the original
        const newRatings = [...ratings]; 
        // Calc new rating by adding increment value to current rating, use math.min and max to ensure a range of 1-5
        const newRating = Math.min(5, Math.max(1, newRatings[index].rating + increment)); 
        newRatings[index].rating = newRating; // assign updated rating to the 'rating' property at the index for the current track
        setRatings(newRatings); // update the state with the newRatings array, causing a re-render
    }

    /**
     * Event handler to issue PUT request with the updated rating value
     * @param {number} index - index of current rating to be updated
     * @param {string} userID - userID used to check for rating that is specific to this user
     */
    async function handleEditButtonClick(index, userID) {
        // To issue PUT request, we require userID+trackID to search the composite key in DB for this existing rating, and the new rating
        const putMusicID = ratings[index].musicID; // get the track ID at the index to be updated
        const putNewRating = ratings[index].rating; // get the new rating

        try {
            const response = await axios.put('http://localhost:5000/putRatings', {
                putUserID: userID,
                putMusicID: putMusicID,
                putNewRating: putNewRating
            });

            if (response.status === 200) {
                console.log('\nUpdated track rating\n');
                setRatingEdited(true);
                setTimeout(() => {
                    setRatingEdited(false);
                }, 2500); // Set a timeout to reset the state after 2.5 seconds
            }
        } catch (error) {
            console.log('Error sending data', error);
        }
    }

    // fetch ratings stored in DB 
    async function retrieveRatings(userID) {
        try {
            const response = await axios.get('http://localhost:5000/getRatings/' + userID);
            setRatings(response.data.result);
        } catch (error) {
            console.error('Error retrieving ratings:', error);
        }
    }

    // invoke retrieveRatings on component mount
    useEffect(() => {
        retrieveRatings(userID);
    }, [userID]);

    /**
     * Event handler to issue delete request 
     * @param {string} userID - ID of user making the request
     * @param {string} musicID - track ID of track rating to be deleted
     */
    async function handleDeleteButtonClick(userID, musicID) {
        try {
            const response = await axios.delete('http://localhost:5000/delRatings', {
                data: {
                    delUserID: userID,
                    delMusicID: musicID
                }
            });

            if (response.status === 200) {
                console.log('Rating deleted successfully');
                retrieveRatings(userID); // Refresh ratings after delete
                setRatingDeleted(true);
                setTimeout(()=>{ // wait 2.5s to reset the state (gives time to display "Rating deleted" msg for 2.5s)
                    setRatingDeleted(false);
                },2500) 
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    }

    return (
        <div>  
            {/* show/hide saved ratings */}
            <button onClick={() => { retrieveRatings(userID); setShowRatings(!showRatings) }}>
                {showRatings ? 
                    <p className="text-white text-xl w-60 border-solid border-6 border rounded-full border-sky-600 
                    bg-gradient-to-r from-pink-500 to-violet-500">Display saved ratings</p> 
                    : 
                    <p className="text-white text-xl w-60 border-solid border-6 border rounded-full border-sky-600 
                    bg-gradient-to-r from-pink-500 to-violet-500">Minimize</p>}
            </button>
            <div id='ratings' className={`mt-4 ${showRatings ? 'invisible' : 'visible'}`}>
            {ratingEdited && <p className="rating-updated text-green-500 text-center text-2xl">Rating Updated!</p>} {/* when a rating gets updated using the edit-button this p-tag gets displayed at top of table */}
            {ratingDeleted && <p className="rating-deleted text-green-500 text-center text-2xl">Rating Deleted!</p>} {/* display msg when rating is deleted using the delete-button */}
                {/* table containing rating info. -- title, artist, rating, update/delete buttons */}
                <table className="text-white border-collapse border border-gray-300 bg-indigo-700">
                    <thead className="text-l border-b-2">
                        <th className="p-2">Title</th> <th className="p-2">Artist</th> <th className="p-2">Rating</th>
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
                                <td><button className="edit-button" type="button" onClick={() => handleEditButtonClick(index, userID)}>UPDATE</button></td>
                                <td><button className="delete-button" type="button" onClick={() => handleDeleteButtonClick(userID, rating.musicID)}>DEL</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModifyRatings;
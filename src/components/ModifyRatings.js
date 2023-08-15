import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function ModifyRatings({ userID }) {
    const [showRatings, setShowRatings] = useState(true);
    const [ratings, setRatings] = useState([]);
    const [ratingEdited, setRatingEdited] = useState(false);
    const [ratingDeleted, setRatingDeleted] = useState(false);

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
                setRatingEdited(true);
                setTimeout(() => {
                    setRatingEdited(false);
                }, 2500); // Set a timeout to reset the state after 3 seconds
            }
        } catch (error) {
            console.log('Error sending data', error);
        }
    }

    // get req for ratings stored in DB 
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
                    ml-1 pl-2 bg-gradient-to-r from-pink-500 to-violet-500 mt-10">Display saved ratings</p> 
                    : 
                    <p className="text-white text-xl w-60 border-solid border-6 border rounded-full border-sky-600 
                    ml-1 pl-2 bg-gradient-to-r from-pink-500 to-violet-500 mt-10">Minimize</p>}
            </button>
            <div id='ratings' className={`mt-4 ${showRatings ? 'invisible' : 'visible'}`}>
            {ratingEdited && <p className="rating-updated text-green-500 text-center text-2xl">Rating Updated!</p>} {/* when a rating gets updated using the edit-button this p-tag gets displayed at top of table */}
            {ratingDeleted && <p className="rating-deleted text-green-500 text-center text-2xl">Rating Deleted!</p>} {/* display msg when rating is deleted using the delete-button */}
                <table className="text-white border-collapse border border-gray-300">
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
                                <td><button className="edit-button" type="button" onClick={(event) => handleEditButtonClick(event, index, userID)}>UPDATE</button></td>
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
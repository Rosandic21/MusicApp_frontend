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
                // Refresh ratings after delete
                retrieveRatings(userID);
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    }




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
                                <td><button className="edit-button" type="button" onClick={(event) => handleEditButtonClick(event, index, userID)}>EDIT</button></td>
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
/* RatingComponent.js: used in Playlists.js to allow users to rate 
 tracks from 1-5 stars and issue CRUD commands to DB with those ratings */



 /**************TODO: Update crud functions to handle edge cases (like if)  **********************/
/*                   Handle edge cases (this may need to be done in authRoutes instead or aswell)  
                    1. on insertion: check that no row with matching userID + musicID exists and if it exists then issue UPDATE instead
                    2. prepared statements?
*/



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingComponent = ({ userID, musicID, title, artist }) => {
  // State to track the selected rating (1-5 stars)
  const [rating, setRating] = useState(0);

  // State to track whether the rating has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State to show/hide the "Rating submitted!" message
  const [showMessage, setShowMessage] = useState(false);

  // Effect to show the "Rating submitted!" message and clear it after 3 seconds
  useEffect(() => {
    let timeout;

    // If rating is submitted, show the message and set a timeout to hide it
    if (isSubmitted) {
      setShowMessage(true);
      timeout = setTimeout(() => {
        setShowMessage(false);
        setIsSubmitted(false);
      }, 3000);
    }

    // Clear the timeout when the component unmounts or when isSubmitted changes
    return () => clearTimeout(timeout);
  }, [isSubmitted]);

  // Function to handle changes in the selected rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setIsSubmitted(false); // Reset submission status
    setShowMessage(false); // Hide the message
  };

  // Function to handle the submit button click
  const handleSubmit = async () => {
    console.log('Selected Rating:', rating);
  
  
    try {
      // Send rating to backend
      const response = await axios.post('http://localhost:5000/ratings', {
        //action: 'create',
        userID: userID, 
        musicID: musicID,
        rating: rating,
        title: title,
        artist: artist,
      })
      if (response.status === 200) {
        setIsSubmitted(true); // Set submission status to true
      }
     } catch(error){
        console.log("Error sending data ", error);
      }



  };

  return (
    <div className="flex items-center">
      {/* Mapping through 1 to 5 to create star buttons */}
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => handleRatingChange(value)}
          className={`mr-2 text-2xl ${
            value <= rating ? 'text-yellow-500' : 'text-gray-400'
          }`}
        >
          &#9733; {/* Unicode star character */}
        </button>
      ))}
      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
      {/* Show "Rating submitted!" message */}
      {showMessage && (
        <p className="ml-2 text-green-500">Rating submitted!</p>
      )}
    </div>
  );
};

export default RatingComponent;

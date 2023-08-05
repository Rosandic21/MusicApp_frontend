/* RatingComponent.js: used in Playlists.js to allow users to rate 
 tracks from 1-5 stars and issue CRUD commands to DB with those ratings */

import React, { useState, useEffect } from 'react';

const RatingComponent = () => {
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
  const handleSubmit = () => {
    console.log('Selected Rating:', rating);
  
    // ***** TODO: get the userID and the music ID *************************/
    // try {
    //   // Send rating to backend
    //   await axios.post('/api/ratings', {
    //     userID: userID goes here, // Replace with actual user ID
    //     musicID,
    //     rating: rating,
    //   })
    //    setIsSubmitted(true); // Set submission status to true
    //  } catch(error){
    //     console.log("Error sending data ")
    //   }
//**************************************************************************/



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

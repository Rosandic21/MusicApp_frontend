// UserInfo.js
import React from 'react';

/**
 * Prints user's display name with a welcome msg
 * @param {object} userData - object from Spotify Api containing user data, such as display name
 * @returns {JSX.Element} - UserInfo React component 
 */
const UserInfo = ({ userData }) => {
  return (
    <>
      <p className="introText slide_in_text mb-4 ml-1">Hello, {userData.display_name}!</p>
    </>
  );
};

export default UserInfo;
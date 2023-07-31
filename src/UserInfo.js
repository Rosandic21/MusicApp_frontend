// UserInfo.js
import React from 'react';

const UserInfo = ({ userData }) => {
  return (
    <>
      <p id="introText">Hello, {userData.display_name}!</p>
    </>
  );
};

export default UserInfo;
// UserInfo.js
import React from 'react';

const UserInfo = ({ userData }) => {
  return (
    <>
      <p className="introText mb-4 ml-1">Hello, {userData.display_name}!</p>
    </>
  );
};

export default UserInfo;
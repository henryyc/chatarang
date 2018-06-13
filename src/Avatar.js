import React from 'react';

const Avatar = ({ user, email, style }) => {
  return (
    <div
      className="Avatar"
      style={{
        ...styles,
        ...style,
        background: `url(https://api.adorable.io/avatars/40/${email})`,
      }}
    ></div>
  );
};

const styles = {
  height: '40px',
  width: '40px',
  fontSize: '1rem',
  borderRadius: '20px',
}

export default Avatar;

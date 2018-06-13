import React from 'react';

const Metadata = (props) => {
  return (
    <div
      className="Metadata"
      style={styles.metadata}
    >
      <div
        className="user"
        style={styles.metadataAndUser}
      >
        {props.message.userName}
      </div>
      <div
        className="time"
        style={styles.metadataAndTime}
      >
        1:10 PM
      </div>
    </div>
  );
};

const styles = {
  metadata: {
    display: 'flex',
    alignItems: 'baseline',
  },

  metadataAndUser: {
    fontWeight: 'bold',
    marginRight: '0.5rem',
  },

  metadataAndTime: {
    color: '#999',
    fontSize: '0.8rem',
  },
};

export default Metadata;

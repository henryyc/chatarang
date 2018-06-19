import React from 'react';
import moment from 'moment';

const Metadata = ({ message }) => {
  return (
    <div
      className="Metadata"
      style={styles.data}
    >
      <div className="user" style={styles.user}>{message.user.displayName}</div>
      <div className="time" style={styles.time}>{moment(message.createdAt).format('h:mm a')}</div>
    </div>
  );
};

const styles = {
  data: {
    display: 'flex',
    alignItems: 'baseline',
  },

  user: {
    fontWeight: 'bold',
    marginRight: '0.5rem',
  },

  time: {
    color: '#999',
    fontSize: '0.8rem',
  },
};

export default Metadata;

import React from 'react';

import Avatar from './Avatar';
import Metadata from './Metadata';

const Message = (props) => {
  return (
    <div
      className="Message"
      style={styles.message}
    >

      <div
        className="Details"
        style={styles.messageAndDetails}
      >
        <Metadata message={props.message} />

        <div
          className="body"
          style={styles.body}
        >
          {props.message.body}
        </div>
      </div>
    </div>
  );
};

const styles = {
  message: {
    display: 'flex',
    marginTop: '1rem',
    padding: '0 1rem',
  },

  messageAndDetails: {
    flex: 1,
    paddingLeft: '0.5rem',
  },

  body: {
    margin: 0,
    fontFamily: 'Raleway, sans-serif',
  },
}

export default Message;

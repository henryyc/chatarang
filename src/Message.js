import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart';

import Avatar from './Avatar';
import Metadata from './Metadata';

class Message extends Component {
  state = {
    showPicker: false,
  };

  togglePicker = () => {
    this.setState({ showPicker: !this.state.showPicker });
  }

  handleEmojiSelect = (emoji) => {
    const { message } = this.props;

    if (!message.reactions) {
      message.reactions = {};
    }

    const reactions = {...message.reactions};

    // add new reaction
    if (!reactions[emoji.id] || !((reactions[emoji.id]) instanceof Object)) {
      const users = new Set();
      users.add(message.user.uid);

      reactions[emoji.id] = {
        freq: 1,
        likedBy: users,
      };
    }
    // update existing reaction
    else {
      const users = reactions[emoji.id].likedBy;
      users.add(message.user.uid);

      reactions[emoji.id] = {
        freq: users.size,
        likedBy: users,
      };
    }

    // update message with new reaction
    message.reactions = reactions;
    console.log(message.reactions)

    this.props.handleReaction(message);
    this.togglePicker();
  }

  render() {
    const { message } = this.props;

    return (
      <div className={`Message ${css(styles.message)}`}>
        <Avatar user={message.user} email={message.user.email} />

        <div className={`details ${css(styles.details)}`}>
          <Metadata message={message} />
          <div className="body">
            {message.body}
          </div>
          <div className={css(styles.reactions)}>
            {
              message.reactions
              ?  Object.keys(message.reactions).map(
                  (id) => {
                    return (
                      <div key={id}>
                        <Emoji emoji={id} set='emojione' size={16} /> {message.reactions[id].freq}
                      </div>
                    );
                  }
                )
              : null
            }
          </div>

          <button
            className={`reactionButton ${css(styles.reactionButton)}`}
            onClick={this.togglePicker}
          >
            <i className="far fa-smile"></i>
          </button>
          {
            this.state.showPicker &&
              <Picker
                showPreview={false}
                style={pickerStyles}
                onSelect={this.handleEmojiSelect}
              />
          }
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    display: 'flex',
    marginTop: '1rem',
    padding: '1rem 1rem',
    position: 'relative',
    zIndex: 1,

    ':hover': {
      backgroundColor: '#f6f6f6',
    },
  },

  details: {
    flex: 1,
    paddingLeft: '0.5rem',
  },

  reactionButton: {
    border: 0,
    outline: 0,
    backgroundColor: 'transparent',
    padding: 0,
    fontSize: '1rem',
    color: '#ccc',
    cursor: 'pointer',
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',

    ':hover': {
      color: '#3366ff',
    },
  },

  reactions: {
    display: 'inline-block',
  },
});

const pickerStyles = {
  position: 'absolute',
  top: '-20rem',
  right: '2rem',
}

export default Message;

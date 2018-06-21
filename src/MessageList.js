import React, { Component } from 'react';

import Message from './Message';

class MessageList extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  handleReaction = (msg) => {
    for (let i = 0; i < this.props.messages.length; i++) {
      if (this.props.messages[i].id === msg.id) {
        this.props.messages[i] = msg;
      }
    }
    this.props.update(this.props.messages);
  }

  render() {
    const { messages, room } = this.props;

    return (
      <div
        className="MessageList"
        style={styles.list}
      >
        <div className="roomAnnouncement" style={styles.announcement}>
          <h3 style={styles.h3}>#{room.displayName}</h3>
          {
            room.dm
            ? <p>This is the very beginning of the direct message.</p>
            : <p>This is the very beginning of the #{room.name} room.</p>
          }
        </div>

        {
          messages.map((msg) => (
            <Message key={msg.id} message={msg} handleReaction={this.handleReaction} user={this.props.user} />
          ))
        }
        <div ref={el => this.messagesEnd = el}></div>
      </div>
    );
  }
};

const styles = {
  list: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: '1rem',
    overflowY: 'scroll',
  },

  announcement: {
    padding: '2rem 1rem 10rem',
  },

  h3: {
    fontSize: '1.5rem',
  },
};

export default MessageList;

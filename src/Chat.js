import React, { Component } from 'react';

import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import base from './base';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    base.syncState('general/messages', {
      context: this,
      state: 'messages',
      asArray: true,
    });
  }

  componentDidUpdate() {
    console.log(this.props.room);
  }

  // shorthand - key is same as variable name
  addMessage = (body) => {
    const messages = [...this.state.messages];
    messages.push({
      id: Date.now(),
      user: this.props.user,
      body,
    });

    this.setState({ messages });
  }

  render() {
    return (
      <div className="Chat" style={styles}>
        <ChatHeader room={this.props.room} />
        <MessageList messages={this.state.messages} room={this.props.room} />
        <MessageForm addMessage={this.addMessage} />
      </div>
     );
  }
}

const styles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}

export default Chat;

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
      rebaseBinding: null,
    };
  }

  componentDidMount() {
    this.syncMessages();
  }

  // update room
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.syncMessages();
    }
  }

  // sync messages w/ firebase
  syncMessages = () => {
    if (this.state.rebaseBinding) {
      base.removeBinding(this.state.rebaseBinding);
    }

    const rebaseBinding = base.syncState(`${this.props.room.name}/messages`, {
      context: this,
      state: 'messages',
      asArray: true,
    });

    this.setState({ rebaseBinding });
  }

  // shorthand - key is same as variable name
  addMessage = (body) => {
    const messages = [...this.state.messages];
    messages.push({
      id: `${this.props.user.uid}-${Date.now()}`,
      user: this.props.user,
      body,
      createdAt: Date.now(),
      reactions: "",
    });

    this.setState({ messages });
  }

  addReaction = (message, emoji) => {
    message.reactions = message.reactions || {};
    message.reactions[emoji] = message.reactions[emoji] || [];

    if (message.reactions[emoji].indexOf(this.props.user.uid) === -1) {
      message.reactions[emoji].push(this.props.user.uid);
    }

    const messages = [...this.state.messages];
    const i = messages.findIndex(msg => msg.id === message.id);
    messages[i] = message;

    this.setState({ messages });
  }

  render() {
    return (
      <div className="Chat" style={styles}>
        <ChatHeader room={this.props.room} removeRoom={this.props.removeRoom}/>
        <MessageList
          messages={this.state.messages}
          room={this.props.room}
          addReaction={this.addReaction}
        />
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

import React, { Component } from 'react';

import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          id: 1,
          userName: 'dstrus',
          body: 'asdfasdf',
        },
        {
          id: 2,
          userName: 'dpalazzo',
          body: 'asdfasdfasdfas',
        },
      ],
    };
  }

  // shorthand - key is same as variable name
  addMessage = (body) => {
    const messages = [...this.state.messages];
    messages.push({
      id: Date.now(),
      userName: 'jieun',
      body,
    });

    this.setState({ messages });
  }

  render() {
    return (
      <div className="Chat">
        <ChatHeader />
        <MessageList messages={this.state.messages} />
        <MessageForm addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default Chat;

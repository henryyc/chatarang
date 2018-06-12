import React from 'react';

import Message from './Message';

const MessageList = () => {
  const messages = [
    {
      id: 1,
      userName: 'dstrus',
      body: 'YEEEET ggx gang',
    },
    {
      id: 2,
      userName: 'dpalazzo',
      body: 'f in the chat',
    },
  ];

  return (
    <div className="MessageList">
      {
        messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))
      }
    </div>
  );
};

export default MessageList;

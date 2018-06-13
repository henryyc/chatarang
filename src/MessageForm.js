import React, { Component } from 'react';

class MessageForm extends Component {
  state = {
    body: '',
  }

  // submit message
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.addMessage(this.state.body);
    this.setState({ body: '' });
  }

  // update text form display
  handleChange = (ev) => {
    this.setState({ body: ev.target.value });
  }

  render() {
    return (
      <form
        className="MessageForm"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="body"
          placeholder="Type a message..."
          value={this.state.body}
          onChange={this.handleChange}
          autoFocus
        />

        <button type="submit">Send</button>
      </form>
    );
  }
};

export default MessageForm;

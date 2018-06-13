import React, { Component } from 'react';

import './App.css';
import Main from './Main';

class App extends Component {
  state = {
    user: {
      uid: '8234892798',
      userName: 'asdf',
      email: 'chris@christ.com',
    },
  }

  render() {
    return (
      <div className="App">
        <Main user={this.state.user} />
      </div>
    );
  }
}

export default App;

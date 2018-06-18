import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import SignIn from './SignIn';
import Main from './Main';
import { auth } from './base';

class App extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.setState({ user });
    }

    // sync auth w/firebase
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // signed in
          this.handleAuth(user);
        }
        else {
          // signed out
          this.handleUnath();
        }
      }
    );
  }

  signedIn = () => {
    return this.state.user.uid;
  };

  // update state of user and store user in local storage
  handleAuth = (oauthUser) => {
    const user = {
      uid: oauthUser.uid,
      displayName: oauthUser.displayName,
      email: oauthUser.email,
      photoUrl: oauthUser.photoURL,
    }
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
  }

  handleUnath = () => {
    this.setState({ user: {} });
    localStorage.removeItem('user');
  }

  signOut = () => {
    auth.signOut();
    this.setState({ user: {} });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route
            path="/rooms/:roomName"
            render={
              navProps => (
                <Main
                  user={this.state.user}
                  signOut={this.signOut}
                  {...navProps}
                />
              )
            }
          />
        </Switch>

        {/* {
          this.signedIn()
            ? <Main user={this.state.user} signOut={this.signOut} />
            : <SignIn handleAuth={this.handleAuth} />
        } */}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import SignIn from './SignIn';
import Main from './Main';
import base, { auth } from './base';

class App extends Component {
  constructor(props) {
    super(props);

    const user = JSON.parse(localStorage.getItem('user')) || {};
    this.state = {
      user,
      users: {},
    };
  }

  // sync auth w/firebase
  componentDidMount() {
    base.syncState(
      'users',
      {
        context: this,
        state: 'users',
      }
    );

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
    // build the user object
    const user = {
      uid: oauthUser.uid,
      displayName: oauthUser.displayName,
      email: oauthUser.email,
      photoUrl: oauthUser.photoURL,
    }

    // update the list of users
    const users = {...this.state.users}
    users[user.uid] = user

    // update state and localStorage
    this.setState({ user, users });
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
    const mainProps = {
      user: this.state.user,
      signOut: this.signOut,
      users: this.state.users,
    };

    return (
      <div className="App">
        <Switch>
          <Route
            path="/sign-in"
            render={navProps => (
              this.signedIn()
                ? <Redirect to="/rooms/general" />
                : <SignIn />
            )}
          />
          <Route
            path="/rooms/:roomName"
            render={navProps => (
              this.signedIn()
              ? <Main
                  {...mainProps}
                  {...navProps}
                />
              : <Redirect to="/sign-in" />
            )}
          />
          <Route
            render={() => (
              this.signedIn()
                ? <Redirect to="/rooms/general" />
                : <Redirect to="/sign-in" />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;

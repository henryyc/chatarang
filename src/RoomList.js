import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Route, Switch, Link } from 'react-router-dom';

import RoomLink from './RoomLink';
import RoomForm from './RoomForm';

import DirectMessageForm from './DirectMessageForm';

class RoomList extends Component {

  render() {
    const { rooms } = this.props;

    return (
      <Switch>
        <Route
          path="/rooms/new"
          render={(navProps) => (
            // <RoomForm
            <DirectMessageForm
              addRoom={this.props.addRoom}
              users={this.props.users}
              {...navProps}
              user={this.props.user}
            />
          )}
        />
        <Route
          render={
            () => (
              <nav className={`RoomList ${css(styles.nav)}`}>
                <div className={css(styles.heading)}>
                  <h2 className={css(styles.h2)}>Rooms</h2>
                  <Link
                    className={css(styles.button)}
                    to="/rooms/new"
                  >
                    <i className="fas fa-plus-circle"></i>
                  </Link>
                </div>

                <ul className={css(styles.list)}>
                  {
                    Object.keys(rooms).map(
                      (roomName) => {
                        return (<RoomLink key={roomName} room={rooms[roomName]} />);
                      }
                    )
                  }
                </ul>
              </nav>
            )
          }
        />
      </Switch>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    padding: '0 1rem',
  },

  h2: {
    fontSize: '1rem',
  },

  list: {
    listStyle: 'none',
    marginLeft: 0,
    paddingLeft: 0,
  },

  item: {
    marginBottom: '0.5rem',
  },

  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    border: 0,
    backgroundColor: 'transparent',
    outline: 0,
    padding: 0,
    color: 'rgba(255, 255, 255, .4)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'color 0.25s ease-out',

    ':hover': {
      color: 'white',
    },
  },
});

export default RoomList;

import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import RoomLink from './RoomLink';
import base from './base';

class RoomList extends Component {

  state = {
    rooms: {},
  };

  // get list of rooms from firebase
  componentDidMount() {
    base.syncState(
      'rooms',
      {
        context: this,
        state: 'rooms',
      }
    )
  }

  // add a new room
  addRoom = (room) => {
    const rooms = {...this.state.rooms};
    rooms[room.name] = room;
    this.setState({ rooms });
  }

  render() {
    return (
      <nav className={`RoomList ${css(styles.nav)}`}>
        <h2 className={css(styles.h2)}>Rooms</h2>

        <ul className={css(styles.list)}>
          {
            Object.keys(this.state.rooms).map(
              (roomName) => (
                <RoomLink
                  key={roomName}
                  room={this.state.rooms[roomName]}
                  loadRoom={this.props.loadRoom}
                />
              )
            )
          }
        </ul>
      </nav>
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
});

export default RoomList;

import React from 'react';

const PLAYER_COLORS = {
  'player-1': 'red',
  'player-2': 'blue',
};

export default class Tile extends React.Component {
  render = () => {
    const { cell, player, onClick } = this.props;

    const buttonColor = cell === 0 ? 'white' : PLAYER_COLORS[player];

    return (
      <button style={{ backgroundColor: buttonColor }} onClick={onClick}>
        {cell}
      </button>
    );
  }
}
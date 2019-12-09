import React from 'react';

import createField from '../utils/create-field';
import cloneField from '../utils/clone-field';
import genNum from '../utils/generate-random-number';
import Field from './field';

export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fieldPlayer1: createField(10, 10),
      fieldPlayer2: createField(10, 10),
      currentPlayer: 'player-1',
    };
  }

  render = () => {

  };
}

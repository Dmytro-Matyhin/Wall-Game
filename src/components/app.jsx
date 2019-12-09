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

  handleButtonClick = (fieldName, x, y, newNumber) => {
    const fieldClone = cloneField(this.state[fieldName]);
    fieldClone[y][x] = newNumber;

    this.setState({
      [fieldName]: fieldClone,
    });
  };

  render = () => {
    console.log(this.state.fieldPlayer1);
    console.log(cloneField(this.state.fieldPlayer1));

    return (
      <div>
        <Field field={this.state.fieldPlayer1} fieldName='fieldPlayer1' player='player-1' onButtonClick={this.handleButtonClick}/>
        <Field field={this.state.fieldPlayer2} fieldName='fieldPlayer2' player='player-2' onButtonClick={this.handleButtonClick} />
      </div>
    );
  };
}

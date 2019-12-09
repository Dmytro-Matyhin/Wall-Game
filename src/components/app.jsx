import React from 'react';

import createField from '../utils/create-field';
import cloneField from '../utils/clone-field';
import genNum from '../utils/generate-random-number';

export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      'player-1': createField(10, 10),
      'player-2': createField(10, 10),
      currentPlayer: 'player-1',
    };
  }

  onTileClick = (fieldName, x, y, newNumber) => {
    if (fieldName !== this.state.currentPlayer) {
      return;
    }

    const fieldClone = cloneField(this.state[fieldName]);
    fieldClone[y][x] = newNumber;

    this.setState({
      [fieldName]: fieldClone,
      currentPlayer: this.state.currentPlayer === 'player-1' ? 'player-2' : 'player-1',
    });
  }

  render = () => {
    return (
      <div>
        <div>
          {
            this.state['player-1'].map((row, rowIndex) => {
              return (
                <div>
                  {
                    row.map((tile, tileIndex) => {
                      return (
                        <button 
                          style={{
                            width: '30px',
                            height: '30px',
                            outline: 'none',
                            border: '1px solid red',
                            backgroundColor: tile === 0 ? 'white' : 'red'
                          }}
                          onClick={() => {
                            this.onTileClick('player-1', tileIndex, rowIndex, 1);
                          }}
                        >
                        </button>
                      );
                    })
                  }
                </div>
              )
            })
          }
        </div>
        <div>
          {
            this.state['player-2'].map((row, rowIndex) => {
              return (
                <div>
                  {
                    row.map((tile, tileIndex) => {
                      return (
                        <button 
                        style={{
                          width: '30px',
                          height: '30px',
                          outline: 'none',
                          border: '1px solid blue',
                          backgroundColor: tile === 0 ? 'white' : 'blue'
                        }}
                          onClick={() => {
                            this.onTileClick('player-2', tileIndex, rowIndex, 1);
                          }}
                        >
                        </button>
                      );
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    );
  };
}

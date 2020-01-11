import React from 'react';

import createField from '../utils/create-field';
import cloneField from '../utils/clone-field';
import cloneArray from '../utils/clone-array';
import findTileIndex from '../utils/find-tile-index';
import deleteIndex from '../utils/delete-index';
import genNum from '../utils/generate-random-number';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    const showRandNumb = genNum(1, 6);

    this.state = {
      'player-1': createField(10, 10),
      'player-2': createField(10, 10),
      currentPlayer: 'player-1',
      currentRandom1: showRandNumb[0],
      currentRandom2: showRandNumb[1],
      currentPlayerTurn: [],
    };
  }

  onTileClick = (x, y, player) => {
    if (player !== this.state.currentPlayer) {
      return;
    }

    if (this.state[player][y][x] === 1) {
      return;
    }

    const existingTileIndex = findTileIndex(this.state.currentPlayerTurn, x, y);

    if (existingTileIndex !== -1) {
      const newCurrentPlayerTurn = deleteIndex(this.state.currentPlayerTurn, existingTileIndex);
      
      this.setState({ currentPlayerTurn: newCurrentPlayerTurn });

      return;
    }

    const newCurrentPlayerTurn = cloneArray(this.state.currentPlayerTurn);
    const tempTile = { x, y };
    newCurrentPlayerTurn.push(tempTile);

    this.setState({ currentPlayerTurn: newCurrentPlayerTurn });
  }

  checkPlayerMove = () => {
    const { currentPlayerTurn, currentPlayer } = this.state;
    const clonePlayerField = cloneField(this.state[currentPlayer]);

    for (let i = 0; i < currentPlayerTurn.length; i++) {
      const tileCoords = currentPlayerTurn[i];

      clonePlayerField[tileCoords.y][tileCoords.x] = 1;
    }

    const showRandNumb = genNum(1, 6);

    this.setState({
      currentRandom1: showRandNumb[0],
      currentRandom2: showRandNumb[1],
      currentPlayer: currentPlayer === 'player-1' ? 'player-2' : 'player-1',
      currentPlayerTurn: [],
      [currentPlayer]: clonePlayerField,
    });
  };

  render = () => {
    return (
      <div>
        <div>
          {
            this.state['player-1'].map((row, x) => {
              return (
                <div>
                  {
                    row.map((tile, y) => {
                      if (this.state.currentPlayer === 'player-1' && findTileIndex(this.state.currentPlayerTurn, y, x) !== -1) {
                        return (
                          <button 
                          style={{
                            width: '30px',
                            height: '30px',
                            outline: 'none',
                            border: '1px solid #FF7400',
                            backgroundColor: '#C81B1B'
                          }}
                          onClick={() => {
                            this.onTileClick(y, x, 'player-1');
                          }}
                        >
                        </button>
                          )
                      }

                      return (
                        <button 
                          style={{
                            width: '30px',
                            height: '30px',
                            outline: 'none',
                            border: '1px solid #FF7400',
                            backgroundColor: tile === 0 ? 'white' : '#C81B1B'
                          }}
                          onClick={() => {
                            this.onTileClick(y, x, 'player-1');
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
            this.state['player-2'].map((row, y) => {
              return (
                <div>
                  {
                    row.map((tile, x) => {
                      if(this.state.currentPlayer === 'player-2' && findTileIndex(this.state.currentPlayerTurn, x, y) !== -1) {
                        return(
                          <button
                            style={{
                              width: '30px',
                              height: '30px',
                              outline: 'none',
                              border: '1px solid #3344F8',
                              backgroundColor: '#0D1EC5'
                            }}
                            onClick={() => {
                              this.onTileClick(x, y, 'player-2');
                            }}
                            >
                          </button>
                          )
                      }

                      return (
                        <button 
                        style={{
                          width: '30px',
                          height: '30px',
                          outline: 'none',
                          border: '1px solid #3344F8',
                          backgroundColor: tile === 0 ? 'white' : '#0D1EC5'
                        }}
                          onClick={() => {
                            this.onTileClick(x, y, 'player-2');
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
          <button onClick={this.checkPlayerMove}>
            {'FINISH MOVE'}
          </button>
          <p>{this.state.currentPlayer}</p>
          <p>{`Random number 1: ${this.state.currentRandom1}`}</p>
          <p>{`Random number 2: ${this.state.currentRandom2}`}</p>
        </div>
      </div>
    );
  };
}

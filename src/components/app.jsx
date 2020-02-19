import React from 'react';
import { 
  findIndex as _findIndex,
  cloneDeep as _cloneDeep,
} from 'lodash';

import createField from '../utils/create-field';
import randomNumber from '../utils/get-random-number';
import deleteIndex from '../utils/delete-index';
import existsZeroInField from '../utils/exists-zero-in-field';
import findBounds from '../utils/find-bounds.js';
import allCellsAreInBounds from '../utils/all-cells-are-in-bounds';

const findArrayIndex = (array, y, x) => _findIndex(array, tile => tile.x === x && tile.y === y);

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 10;
const RANDOM_NUMBER_MIN = 1;
const RANDOM_NUMBER_MAX = 7;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const twoRandomNum = randomNumber(RANDOM_NUMBER_MIN, RANDOM_NUMBER_MAX);

    return {
      'player-1': createField(FIELD_WIDTH, FIELD_HEIGHT),
      'player-2': createField(FIELD_WIDTH, FIELD_HEIGHT),
      currentPlayer: 'player-1',
      currentPlayerTurn: [],
      randomNumbers: twoRandomNum,
      winner: null,
    };
  }

  onTileClick = (player, y, x) => {
    if (player !== this.state.currentPlayer) {
      return;
    }

    if (this.state[player][y][x] === 1) {
      return;
    }

    const existingTileIndex = findArrayIndex(this.state.currentPlayerTurn, y, x);

    if (existingTileIndex !== -1) {
      const newCurrentPlayerTurn = deleteIndex(this.state.currentPlayerTurn, existingTileIndex);
      
      this.setState({
        currentPlayerTurn: newCurrentPlayerTurn,
      });
      
      return;
    }

    const currentPlayerMove = _cloneDeep(this.state.currentPlayerTurn);
    const temporaryTile = {x, y};

    currentPlayerMove.push(temporaryTile);

    this.setState({
      currentPlayerTurn: currentPlayerMove,
    });
  }

  onTurnClick = () => {
    if (this.state.currentPlayerTurn.length === 0) {

      this.setState({
        currentPlayer: this.state.currentPlayer === 'player-1' ? 'player-2' : 'player-1',
        randomNumbers: randomNumber(RANDOM_NUMBER_MIN, RANDOM_NUMBER_MAX)
      });

      return;
    }

    const newPlayerField = _cloneDeep(this.state[this.state.currentPlayer]);

    this.state.currentPlayerTurn.forEach(tile => {
      newPlayerField[tile.y][tile.x] = 1;
    });

    const bounds = findBounds(this.state.currentPlayerTurn);

    if (!bounds) {
      return;
    }

    const topLeft = bounds[0];
    const bottomRight = bounds[1];
    
    const length = (bottomRight.x - topLeft.x) + 1;
    const height = (bottomRight.y - topLeft.y) + 1;

    if (length !== this.state.randomNumbers[0] || height !== this.state.randomNumbers[1]) {
      return;
    }

    if (!allCellsAreInBounds(this.state.currentPlayerTurn, topLeft, bottomRight)) {
      return;
    }

    if (length * height !== this.state.currentPlayerTurn.length) {
      return;
    }

    this.setState({
      currentPlayer: this.state.currentPlayer === 'player-1' ? 'player-2' : 'player-1',
      currentPlayerTurn: [],
      [this.state.currentPlayer]: newPlayerField, 
      randomNumbers: randomNumber(RANDOM_NUMBER_MIN, RANDOM_NUMBER_MAX),
      winner: existsZeroInField(newPlayerField) ? this.state.currentPlayer : null,
    })
  }

  onResetClick = () => {
    this.setState(this.getInitialState());
  }

  render = () => {
    return (
      <React.Fragment>
        <div>
          {
            this.state['player-1'].map((row, y) => {
              return (
                <div>
                  {
                    row.map((cell, x) => {
                      if (this.state.currentPlayer === 'player-1' && findArrayIndex(this.state.currentPlayerTurn, y, x) !== -1) {
                        return (
                          <button
                            style={{
                              width: '30px',
                              height: '30px',
                              outline: 'none',
                              border: '1px solid black',
                              backgroundColor: '#ff7070',
                            }}
                            onClick ={() => this.onTileClick('player-1', y, x)} 
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
                            backgroundColor: cell !== 0 ? '#C81B1B' : 'white',
                          }}
                          onClick={() => this.onTileClick('player-1', y, x)} 
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
          this.state['player-2'].map((row, y) =>
            <div>
              {
                row.map((cell, x) => {
                  if (this.state.currentPlayer === 'player-2' && findArrayIndex(this.state.currentPlayerTurn, y, x) !== -1) {
                    return (
                      <button
                        style={{
                          width: '30px',
                          height: '30px',
                          outline: 'none',
                          border: '1px solid black',
                          backgroundColor: '#7094ff',
                        }}
                        onClick ={() => this.onTileClick('player-2', y, x)} 
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
                          backgroundColor: cell !== 0 ? '#0D1EC5' : 'white',
                        }}
                        onClick ={() => this.onTileClick('player-2', y, x)} 
                      >
                      </button>
                    );
                  })
                }
            </div>
          )
        }      
        </div>
        <button onClick={this.onResetClick}>{'Reset'}</button>
        {
          this.state.winner || <button onClick={this.onTurnClick}>{'End turn'}</button>
        }
        <p>{this.state.currentPlayer}</p>
        <p>{this.state.randomNumbers[0]}</p>
        <p>{this.state.randomNumbers[1]}</p>
        {
          this.state.winner && <p>{`The winner is ${this.state.winner}`}</p>
        }
      </React.Fragment>
    )
  }
}
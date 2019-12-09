import React from 'react';

import Tile from './tile';

export default class FieldRow extends React.Component {
  render = () => {
    const { fieldRow, player, onButtonClick } = this.props;

    return (
      <div>
        {
          fieldRow.map((tile, tileIndex) => {
            const onButtonClickWithTileIndex = (newNumber) => {
              onButtonClick(tileIndex, newNumber);
            }

            return (
              <Tile 
                cell={tile} 
                player={player} 
                onClick={() => onButtonClickWithTileIndex(1)}
              />
            );
          })
        }
      </div>
    )
  };
}
import React from 'react';

import FieldRow from './field-row';

export default class Field extends React.Component {
  render = () => {
    const { field, fieldName, player, onButtonClick } = this.props;

    return (
      <div>
        {
          field.map((fieldRow, rowIndex) => {
            const onButtonClickWithFieldNameAndRowIndex = (x, newNumber) => {
              onButtonClick(fieldName, x, rowIndex, newNumber);
            };

            return (
              <FieldRow 
                fieldRow={fieldRow} 
                player={player} 
                onButtonClick={onButtonClickWithFieldNameAndRowIndex}
              />
            );
          })
        }
      </div>
    )
  };
}
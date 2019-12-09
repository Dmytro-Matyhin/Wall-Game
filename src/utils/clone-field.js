export default field => {
  const newField = [];

  for (let i = 0; i < field.length; i++) {
    const row = [];

    for (let j = 0; j < field[i].length; j++) {
      row.push(field[i][j]);
    }

    newField.push(row);
  }

  return newField;
};
export default cells => {
  if (cells.length === 0) {
    return null;
  }
  
  let topLeft     = cells[0];
  let bottomRight = cells[0];

  for (let i = 0; i < cells.length; i++) {
    const currentCell = cells[i];

    if (currentCell.x <= topLeft.x && currentCell.y <= topLeft.y) {
      topLeft = currentCell;
    }

    if (currentCell.x >= bottomRight.x && currentCell.y >= bottomRight.y) {
      bottomRight = currentCell;
    }
  }

  return [topLeft, bottomRight];
};
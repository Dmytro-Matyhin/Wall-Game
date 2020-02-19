export default (cells, topLeft, bottomRight) => {
  let areInBounds = true;

  for (let i = 0; i < cells.length; i++) {
    const currentCell = cells[i];

    if (currentCell.x < topLeft.x
      || currentCell.y < topLeft.y
      || currentCell.x > bottomRight.x
      || currentCell.y > bottomRight.y
    ) {
      areInBounds = false;

      break;
    }
  }

  return areInBounds;
}
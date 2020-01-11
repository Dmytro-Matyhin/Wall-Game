const indexNotFound = -1;

export default (array, x, y) => {
  if (array.length === 0) {
    return indexNotFound;
  }

  for (let i = 0; i < array.length; i++) {
    const tile = array[i];
    
    if (tile.x === x && tile.y === y) {
      return i;
    }
  }

  return indexNotFound;
}
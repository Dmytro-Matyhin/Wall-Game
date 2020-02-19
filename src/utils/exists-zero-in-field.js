export default field => {
  let isWinner = true;

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === 0) {
        isWinner = false;

        break;
      }
    }

    if (!isWinner) {
      break;
    }
  }

  return isWinner;
}
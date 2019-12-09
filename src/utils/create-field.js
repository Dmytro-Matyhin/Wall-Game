export default (width, height) => {
  const array = [];

  for (let i = 0; i < height; i++) {
    array.push([]);

    for (let j = 0; j < width; j++) {
      array[i].push(0);
    }
  }

  return array;
};
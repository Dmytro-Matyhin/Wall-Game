export default array => {
  const clone = [];

  for (let i = 0; i < array.length; i++) {
    clone.push(array[i]);
  }

  return clone;
};
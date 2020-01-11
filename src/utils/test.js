export default (index, array) => {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== index) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

const mydel = (index, array) => {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    if (i !== index) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

mydel(1, [1,2,3]);
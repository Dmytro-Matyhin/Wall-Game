const randomNumber = (min, max) => {
  const number = Math.random() * (max - min) + min;
  return Math.floor(number);
};

export default (min, max) => {
  return [
    randomNumber(min, max),
    randomNumber(min, max)
  ];
}

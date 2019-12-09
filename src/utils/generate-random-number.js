const rand = (min, max) => {
  const num = min + Math.random() * (max + 1 - min);
  return Math.floor(num);
};

export default (min, max) => {
  return [
    rand(min, max),
    rand(min, max)
  ];
};
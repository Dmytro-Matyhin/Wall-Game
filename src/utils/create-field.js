export default (width, height) => {
  const field = [];
  
  for (let i = 0; i < height; i++) {
    field.push([]);

    for (let j = 0; j < width; j++) {
      field[i].push(0)    
    }
  }
  return field;
} 
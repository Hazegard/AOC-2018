const inputs = require('./Inputs');

const createFuelArray = (index, size, ID) => {
  const temp = new Array(size);
  for (let i = 0; i < size; i++) {
    temp[i] = parseInt(((((i + 10) * index + ID) * (i + 10)) / 100) % 10) - 5;
  }
  return temp;
};

const prepareInput = () => {

}
const partOne = (squareSize) => {
  return inputs.getDay(11).then((res) => {
    res = +res;
    const SIZE = 301;
    const fuel = new Array(squareSize);

    let maxPower = {
      val: -Number.MAX_VALUE,
      x: 0, y: 0,
      size: squareSize,
    };
    for (let i = 0; i < fuel.length; i++) {
      fuel[i] = createFuelArray(i, SIZE, res)
    }

    for (let i = 1; i < SIZE - squareSize; i++) {
      for (let j = 1; j < SIZE - squareSize; j++) {
        let localTotal = 0;
        for (let k = 0; k < squareSize; k++) {
          for (let kk = 0; kk < squareSize; kk++) {
            localTotal += fuel[(i + k) % squareSize][j + kk];
          }
        }
        if (localTotal > maxPower.val) {
          maxPower = {
            val: localTotal,
            x: j,
            y: i,
            size: squareSize,
          }
        }
      }
      fuel.push(createFuelArray(i + squareSize, SIZE, res));
      fuel.shift();
    }
    return Promise.resolve(maxPower)
  })
    .catch(err => console.log(err));
};

partOne(3).then((value) => {
  console.log(value);
  console.log(`${value.x},${value.y}`)
});


const partTwo = () => {
  const P = [];
  for (let i = 1; i < 301; i++) {
    P.push(partOne(i));
  }
  Promise.all(P).then((values) => {
    const res = values.reduce((acc, curr) => {
      return acc.val > curr.val ? acc : curr
    });
    console.log(res);
    console.log(`${res.x},${res.y},${res.size}`)
  });
};

partTwo();
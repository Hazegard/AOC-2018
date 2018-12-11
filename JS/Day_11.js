const inputs = require('./Inputs');

const createFuelArray = (index, size, ID) => {
  const temp = new Array(size);
  for (let i = 0; i < size; i++) {
    temp[i] = parseInt(((((i + 10) * index + ID) * (i + 10)) / 100) % 10) - 5;
  }
  return temp;
};

const partOne = () => {
  inputs.getDay(11).then((res) => {
    res = +res;
    const SIZE = 300;
    const fuel = new Array(3);

    let maxPower = {
      val: 0,
      x: 0, y: 0,
    };
    for (let i = 0; i < fuel.length; i++) {
      fuel[i] = createFuelArray(i, SIZE, res)
    }

    for (let i = 0; i < SIZE - 3; i++) {
      for (let j = 0; j < SIZE - 3; j++) {
        let localTotal = 0;
        for (let k = 0; k < 3; k++) {
          for (let kk = 0; kk < 3; kk++) {
            localTotal += fuel[(i + k) % 3][j + kk];
          }
        }
        if (localTotal > maxPower.val) {
          maxPower = {
            val: localTotal,
            x: j,
            y: i,
          }
        }
      }
      fuel.push(createFuelArray(i + 3, SIZE, res));
      fuel.shift();
    }
    console.log(maxPower);
  })
    .catch(err => console.log(err));
};

partOne();
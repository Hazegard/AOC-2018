const inputs = require('./Inputs');

const partOne = () => {

  const reverseCase = (val) => {
    if (val.toUpperCase() === val) {
      return val.toLowerCase()
    }
    return val.toUpperCase();
  };
  inputs.getDay(5).then((res) => {
    let values = res.split('');
    let prevLength = values.length;
    let currLength = 0;
    while (currLength !== prevLength) {
      prevLength = currLength;
      let prev = values[0];
      for (let i = 1; i < values.length; i++) {
        if (prev === reverseCase(values[i])) {
          values[i - 1] = 0;
          values[i] = 0;
        }
        prev = values[i]
      }
      values = values.filter(e => e !== 0);
      currLength = values.length
    }
    console.log(currLength);
  })
    .catch(err => console.log(err));
};

partOne();
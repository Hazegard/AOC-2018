const inputs = require('./Inputs');

const getRedactedLength = (input) => {
  const reverseCase = (val) => {
    if (val.toUpperCase() === val) {
      return val.toLowerCase()
    }
    return val.toUpperCase();
  };

  let prevLength = input.length;
  let currLength = 0;
  while (currLength !== prevLength) {
    prevLength = currLength;
    let prev = input[0];
    for (let i = 1; i < input.length; i++) {
      if (prev === reverseCase(input[i])) {
        input[i - 1] = 0;
        input[i] = 0;
      }
      prev = input[i]
    }
    input = input.filter(e => e !== 0);
    currLength = input.length
  }
  return currLength;
}

const partOne = () => {


  inputs.getDay(5).then((res) => {
    let values = res.split('');


    console.log(getRedactedLength(values));
  })
    .catch(err => console.log(err));
};

partOne();


const partTwo = () => {
  inputs.getDay(5).then((res) => {
    const values = res.split('');
    let minLength = values.length;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach((letter) => {
      const val = values.filter(e => {
        return e !== letter && e !== letter.toUpperCase()
      });
      const currentLength = getRedactedLength(val);
      if (currentLength < minLength) {
        minLength = currentLength;
      }
    });
    console.log('min');
    console.log(minLength);
  })
};

partTwo();
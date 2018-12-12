const inputs = require('./Inputs');
const test = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;
const partOne = (iterations) => {
  inputs.getDay(12).then((res) => {
    res = res.split('\n\n');
    let pots = res[0].split(':')[1].trim().split('');
    const notes = res[1].split('\n').reduce((acc, curr) => {
      const r1 = curr.split('=>');
      acc[r1[0].trim()] = r1[1].trim();
      return acc;
    }, {});
    let diff = 0;
    let index0 = 0;
    let sum = pots.reduce((acc, curr, i) => {
      if (curr === '#') {
      }
      return curr === '#' ? acc + i - index0 : acc;
    }, 0);

    for (let k = 0; k < iterations; k++) {
      if (pots.slice(0, 5).includes('#')) {
        pots.unshift(...'.....'.split(''));
        index0 += 5;
      }
      if (pots.slice(pots.length - 5, pots.length + 1).includes('#')) {
        pots.push(...'.....'.split(''));
      }
      let newPot = ['.', '.'];
      for (let j = 2; j < pots.length - 2; j++) {
        newPot.push((notes[getState(pots, j)] || '.'));
      }
      newPot.push(...pots.slice(pots.length - 4, pots.length));
      const newSum = newPot.reduce((acc, curr, i) => {
        return curr === '#' ? acc + i - index0 : acc;
      }, 0);
      const newDiff = newSum - sum;
      if (newDiff - diff === 0) {
        sum = (iterations - k - 1) * newDiff + newSum;
        break
      }
      sum = newSum;
      pots = newPot;
      diff = newDiff;
    }
    console.log(sum);
  });
  const getState = (pots, index) => {
    return pots.slice(index - 2, index + 3).join('')
  }
};

partOne(20);
partOne(50000000000);
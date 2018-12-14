const inputs = require('./Inputs');

const partOne = () => {
  inputs.getDay(14).then((res) => {
    const resString = res;
    const r = +res;
    res = 8 + res;
    const scoreboard = [3, 7];
    let elf1 = 0;
    let elf2 = 1;
    let resOne = false;
    let k = 0;
    let sequence = [];
    while (true) {
      const receipt1 = scoreboard[elf1];
      const receipt2 = scoreboard[elf2];
      const sum = receipt1 + receipt2;
      const newReceipt1 = Math.floor(sum / 10);
      const newReceipt2 = sum - 10 * newReceipt1;
      if (newReceipt1) {
        scoreboard.push(newReceipt1);
        res--;
        if (+resString.toString().charAt(sequence.length) === newReceipt1) {
          sequence.push(newReceipt1);
          if (sequence.join('') === resString) {
            break
          }
        } else {
          sequence = [];
          if (+resString.toString().charAt(sequence.length) === newReceipt1) {
            sequence.push(newReceipt1);
          }
        }
        k++;
      }

      res--;
      scoreboard.push(newReceipt2);
      elf1 = (elf1 + 1 + scoreboard[elf1]) % scoreboard.length;
      elf2 = (elf2 + 1 + scoreboard[elf2]) % scoreboard.length;
      if (res <= 0 && !resOne) {
        const response = scoreboard.slice(r, r + 10).join('');
        console.log(response);
        resOne = true;
      }
      k++;
      if (+resString.toString().charAt(sequence.length) === newReceipt2) {
        sequence.push(newReceipt2);
        if (sequence.join('') === resString) {
          break
        }
      } else {
        sequence = [];
        if (+resString.toString().charAt(sequence.length) === newReceipt2) {
          sequence.push(newReceipt2);
        }
      }
    }
    console.log(k - 3);
  })
};

partOne();
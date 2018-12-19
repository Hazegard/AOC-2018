const inputs = require('./Inputs');
const {ops} = require('./Day_16');

const dictOps = ops.reduce((acc, curr) => {
  acc[curr.name] = curr;
  return acc;
}, {});

const partOne = () => {
  inputs.getDay(19).then((res) => {
    const lines = res.split('\n');
    const REG_IP = +lines.shift().split(' ')[1];
    const instructions = lines.map((line) => {
      const val = line.split(' ');
      const func = val.shift();
      const args = val.map(Number);
      return {
        func,
        args
      }
    });
    const reg = new Array(6).fill(0);
    while (true) {
      if (reg[REG_IP] >= instructions.length || reg[REG_IP] < 0) {
        console.log(reg[0]);
        return
      }
      const instruction = instructions[reg[REG_IP]];
      dictOps[instruction.func](reg, ...instruction.args);
      reg[REG_IP]++;
    }
  })
    .catch(err => console.log(err))
};

partOne();

const partTwo = (n) => {
  const n2 = Math.floor(n / 2);
  const factors = [];
  for (let i = 1; i < n2; i++) {
    if (n % i === 0) {
      factors.push(i);
    }
  }
  factors.push(n);
  const res = factors.reduce((acc, curr) => acc + curr, 0);

  console.log(res);
};

partTwo(10551339);
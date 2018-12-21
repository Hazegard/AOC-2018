const inputs = require('./Inputs');
const {ops} = require('./Day_16');

const dictOps = ops.reduce((acc, curr) => {
  acc[curr.name] = curr;
  return acc;
}, {});

const partOne = () => {
  inputs.getDay(21).then((res) => {
    const lines = res.split('\n');
    const IP_REG = +lines.shift().split(' ')[1];
    const instructions = lines.map((line) => line.split(' ').map((e) => +e || (e === '0' ? 0 : e)));
    const REG_SIZE = instructions.reduce((acc, curr) => acc > curr[3] ? acc : curr[3]);
    const executions = {};
    for (let reg0 = 0; reg0 < 1; reg0++) {
      let iteration = 0;
      const reg = new Array(REG_SIZE).fill(0);
      reg[0] = 0;
      while (iteration < 10000000) {
        if (reg[IP_REG] < 0 || reg[IP_REG] >= instructions.length) {
          console.log("break");
          break;
        }
        if (reg[IP_REG] === 28) {
          console.log(reg[1]);
          break
        }
        const instruction = [...instructions[reg[IP_REG]]];
        const cmd = instruction.shift();
        dictOps[cmd](reg, ...instruction);
        iteration++;
        reg[IP_REG]++;
      }
      executions[reg0] = iteration;
    }
  })
    .catch(err => console.log(err));
};

partOne();

// #ip 3
// 0   seti    123         0           1   |   r[1] = 123
// 1   bani    1           456         1   |   r[1] = r[1] & 456
// 2   eqri    1           72          1   |   r[1] = r[1] == 72 ? 1 : 0
// 3   addr    1           3           3   |   r[3] = r[1] +r[3]
// 4   seti    0           0           3   |   r[3] = 0
// 5   seti    0           7           1   |   r[1] = 0
// 6   bori    1           65536       4   |   r[4] = r[1] | 0x10000000000000000
// 7   seti    3798839     3           1   |   r[1] = 3798839
// 8   bani    4           255         5   |   r[5] = r[4] & 0x11111111
// 9   addr    1           5           1   |   r[1] = r[1] + r[5]
// 10  bani    1           16777215    1   |   r[1] = r[1] & 0x111111111111111111111111
// 11  muli    1           65899       1   |   r[1] = r[1] * 65899
// 12  bani    1           16777215    1   |   r[1] = r[1] & 0x111111111111111111111111
// 13  gtir    256         4           5   |   r[5] = 256 > r[4] ? 1 : 0
// 14  addr    5           3           3   |   r[3] = r[5] + r[3]
// 15  addi    3           1           3   |   r[3] = r[3] + 1
// 16  seti    27          6           3   |   r[3] = 27
// 17  seti    0           2           5   |   r[5] = 0
// 18  addi    5           1           2   |   r[2] = r[5] + 1
// 19  muli    2           256         2   |   r[2] = r[2] * 256
// 20  gtrr    2           4           2   |   r[2] = r[2] > r[4] ? 1: 0
// 21  addr    2           3           3   |   r[3] = r[2] + r[3]
// 22  addi    3           1           3   |   r[3] = r[3] + 1
// 23  seti    25          3           3   |   r[3] = 25
// 24  addi    5           1           5   |   r[5] = r[5] + 1
// 25  seti    17          1           3   |   r[3] = 17
// 26  setr    5           6           4   |   r[4] = r[5]
// 27  seti    7           8           3   |   r[3] = 7
// 28  eqrr    1           0           5   |   r[5] = r[1] == r[0] ? 1 : 0 <== Register 0 here
// 29  addr    5           3           3   |   r[3] = r[5] + r[3]
// 30  seti    5           6           3   |   r[3] = 5
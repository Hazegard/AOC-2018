const inputs = require('./Inputs');


const addr = (r, a, b, c) => {
  r[c] = r[a] + r[b];
};
const addi = (r, a, b, c) => {
  r[c] = r[a] + b;
};
const mulr = (r, a, b, c) => {
  r[c] = r[a] * r[b]
};
const muli = (r, a, b, c) => {
  r[c] = r[a] * b;
};
const banr = (r, a, b, c) => {
  r[c] = r[a] & r[b];
};
const bani = (r, a, b, c) => {
  r[c] = r[a] & b;
};
const borr = (r, a, b, c) => {
  r[c] = r[a] | r[b];
};
const bori = (r, a, b, c) => {
  r[c] = r[a] | b;
};
const setr = (r, a, b, c) => {
  r[c] = r[a];
};
const seti = (r, a, b, c) => {
  r[c] = a;
};
const gtir = (r, a, b, c) => {
  r[c] = a > r[b] ? 1 : 0;
};
const gtri = (r, a, b, c) => {
  r[c] = r[a] > b ? 1 : 0;
};
const gtrr = (r, a, b, c) => {
  r[c] = r[a] > r[b] ? 1 : 0;
};
const eqir = (r, a, b, c) => {
  r[c] = a === r[b] ? 1 : 0;
};
const eqri = (r, a, b, c) => {
  r[c] = r[a] === b ? 1 : 0;
};
const eqrr = (r, a, b, c) => {
  r[c] = r[a] === r[b] ? 1 : 0;
};

const ops = [
  addr,
  addi,
  mulr,
  muli,
  banr,
  bani,
  borr,
  bori,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqir,
  eqri,
  eqrr,
];
const partOne = () => {
  inputs.getDay(16).then((res) => {
    let values = res.split('\n\n\n')[0]
      .split('\n\n')
      .map(e => {
        const res = {};
        const temp = e.split('\n');
        res.input = JSON.parse(temp[0].split(':')[1].trim());
        res.instr = temp[1].split(' ').map(Number);
        res.output = JSON.parse(temp[2].split(':')[1].trim());
        return res
      });
    const response = values.reduce((acc, curr) => {
      let correct = 0;
      ops.forEach((op) => {
        const ins = curr.instr.slice(1);
        const res = [...curr.input];
        op(res, ...ins);
        curr.result = res;
        if (curr.result.every((c, idx) => c === curr.output[idx])) {
          correct++;
        }
      });
      return correct >= 3 ? acc + 1 : acc;
    }, 0);
    console.log(response);
  })
    .catch(err => console.log(err))
};

partOne();

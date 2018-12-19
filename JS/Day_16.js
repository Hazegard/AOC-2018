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
module.exports.ops = ops;
const partOne = () => {
  return inputs.getDay(16).then((res) => {
    const opPoss = {};
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
      ops.forEach((op, i) => {
        const opCode = curr.instr[0];
        const ins = curr.instr.slice(1);
        const res = [...curr.input];
        op(res, ...ins);
        curr.result = res;
        if (curr.result.every((c, idx) => c === curr.output[idx])) {
          correct++;
          if (!opPoss[opCode]) {
            opPoss[opCode] = new Set([ops[i].name])
          }
          opPoss[opCode].add(ops[i].name);
        }
      });
      return correct >= 3 ? acc + 1 : acc;
    }, 0);
    console.log(response);
    return Promise.resolve(opPoss)
  })
    .catch(err => console.log(err))
};


const partTwo = (dictOps) => {
  inputs.getDay(16).then((res) => {
    const operations = {};
    while (Object.keys(dictOps).length !== 0) {
      Object.keys(dictOps).forEach((op) => {
        if (dictOps[op].size === 1) {
          operations[op] = [...dictOps[op]][0];
          delete dictOps[op];
          Object.keys(dictOps).forEach((opp) => {
            dictOps[opp].delete(operations[op])
          });
        }
      });
    }

    const opFunc = Object.keys(operations).reduce((acc, curr) => {
      acc[curr] = ops.filter((func) => operations[curr] === func.name)[0];
      return acc
    }, {});
    let values = res.split('\n\n\n')[1]
      .trim()
      .split('\n')
      .map(e => {
        return e.split(' ').map(Number)
      });
    const reg = [0, 0, 0, 0];
    for (const op of values) {
      const opCode = op.shift();
      opFunc[opCode](reg, ...op);
    }
    console.log(reg[0]);
  })
    .catch(err => console.log(err));
};

if (require.main === module) {
  partOne().then((ops) => {
    partTwo(ops)
  });
}
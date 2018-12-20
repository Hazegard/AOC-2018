const inputs = require('./Inputs');

const directions = {
  N: [0, -1],
  S: [0, 1],
  W: [-1, 0],
  E: [1, 0],
}
const partOne = () => {
  inputs.getDay(20).then((res) => {
    const regex = res.split('');
    let currentBranch = {pos: [0, 0], dist: 0};
    const branches = [currentBranch];
    const map = new Map();
    const writeMap = ([x, y]) => {
      const pos = [currentBranch.pos[0] + x, currentBranch.pos[1] + y];
      const branch = map.get(pos.join(',')) || {
        pos,
        dist: Number.MAX_VALUE,
      };
      branch.dist = branch.dist > currentBranch.dist + 1 ? currentBranch.dist + 1 : branch.dist;
      currentBranch = branch;
      map.set(branch.pos.join(','), branch);
    };
    regex.forEach((char) => {
      if ('NEWS'.includes(char)) {
        writeMap(directions[char]);
      } else if (char === "(") {
        branches.push(currentBranch)
      } else if (char === ")") {
        currentBranch = branches.pop()
      } else if (char === "|") {
        currentBranch = branches[branches.length - 1];
      }
    });
    const response = [...map.keys()].reduce((acc, curr) => acc > map.get(curr).dist ? acc : map.get(curr).dist);
    console.log(response);
  })
    .catch(err => console.log(err));
};

partOne();

const inputs = require('./Inputs');

const OPEN = '.'
const TREE = '|';
const LUMBERYARD = '#';

const getAdjacentCells = (x, y) => {
  return [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y], [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
  ]
};
const partOne = () => {
  inputs.getDay(18).then((res) => {
    let field = res.split('\n').map(e => e.split(''));
    for (let _ = 0; _ < 10; _++) {
      const newField = [];
      for (let x = 0; x < field.length; x++) {
        const newRow = [];
        for (let y = 0; y < field[x].length; y++) {
          const acre = field[x][y];
          const adj = getAdjacentCells(x, y).map(c => (field[c[0]] || [])[c[1]] || null).reduce((acc, curr) => {
            if (curr === OPEN) {
              acc.open++;
            } else if (curr === TREE) {
              acc.tree++;
            } else if (curr === LUMBERYARD) {
              acc.lumbeyard++
            }
            return acc;
          }, {open: 0, tree: 0, lumbeyard: 0});
          if (acre === OPEN) {
            if (adj.tree >= 3) {
              newRow.push(TREE);
            } else {
              newRow.push(acre);
            }
          } else if (acre === TREE) {
            if (adj.lumbeyard >= 3) {
              newRow.push(LUMBERYARD);
            } else {
              newRow.push(acre);
            }
          } else if (acre === LUMBERYARD) {
            if (adj.lumbeyard >= 1 && adj.tree >= 1) {
              newRow.push(acre)
            } else {
              newRow.push(OPEN)
            }
          } else {
            console.log(acre)
          }
        }
        newField.push(newRow);
      }
      field = newField;
    }
    let nbTree = 0;
    let nbLumberyard = 0;
    for (let x = 0; x < field.length; x++) {
      for (let y = 0; y < field[x].length; y++) {
        if (field[x][y] === TREE) {
          nbTree++;
        } else if (field[x][y] === LUMBERYARD) {
          nbLumberyard++;
        }
      }
    }
    console.log(nbTree * nbLumberyard)
  })
    .catch(err => console.log(err));
};

partOne();
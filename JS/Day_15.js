const inputs = require('./Inputs');

const extractCoords = (cell) => cell.split(',').map(e => +e);
const getAdjacentCells = (cell) => {
  const [r, c] = extractCoords(cell);
  return [
    [r - 1, c],
    [r, c - 1],
    [r, c + 1],
    [r + 1, c],
  ]
};
const readingSort = (a, b) => {
  if (a.r === b.r) {
    return a.c - b.c;
  }
  return a.r - b.r
};


const printMap = (places, units, round) => {
  let map = '00000000011111111111222222222333333\n' +
    '01234567890123457890123456789012345\n';
  for (let r = 0; r < 32; r++) {
    let row = '';
    row += r < 10 ? '0' + r : r;
    for (let c = 0; c < 32; c++) {
      const rc = r + "," + c;
      if (places.has(rc)) {
        row += ' ';
      } else if (units.filter(u => u.type === 'G' && u.pos() === rc).length) {
        row += 'G'
      } else if (units.filter(u => u.type === 'E' && u.pos() === rc).length) {
        row += 'E'
      } else {
        row += '#'
      }
    }
    row += '\n';
    map += row;
  }
  console.log(map);
  console.log(round);
  console.log(units);
};

const partOne = () => {
  inputs.getDay(15).then((res) => {
    let nbGobs = 0;
    let nbElves = 0;
    const {places, gobs, elves} = res.split('\n')
      .map(l => l.split(''))
      .reduce((acc, curr, r) => {
        const {gobs, places, elves} = curr.reduce((acc, curr, c) => {
          if (curr === 'E') {
            const elve = new Unit(r, c, 'E');
            acc.elves.push(elve);
            nbElves++;
            return acc
          }
          if (curr === 'G') {
            const gob = new Unit(r, c, 'G');
            acc.gobs.push(gob);
            nbGobs++;
            return acc
          }
          if (curr === '.') {
            acc.places.add([r, c].join(','));
          }
          return acc;
        }, {places: new Set(), gobs: [], elves: []});
        return {
          places: new Set([...acc.places, ...places]),
          gobs: [...acc.gobs, ...gobs],
          elves: [...acc.elves, ...elves],
        }
      }, {places: new Set(), gobs: [], elves: []});
    let units = [...gobs, ...elves].sort(readingSort);
    let round = 0;
    while (nbElves > 0 || nbGobs > 0) {
      units = units.filter(u => !u.isDead).sort(readingSort);
      // printMap(places, units.filter(u => !u.isDead), round);
      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        if (unit.isDead) {
          continue
        }
        if (units.filter(u => u.type !== unit.type && !unit.isDead).length === 0) {
          const totalHp = units.reduce((acc, curr) => acc + curr.hp, 0);
          console.log(totalHp * round);
          return Promise.resolve(totalHp)
        }
        const target = unit.getTargetInRange(places, units.filter(u => !u.isDead));
        if (target.length > 0) {
          let tar = target[0];
          if (tar.receiveHit(unit.atk)) {
            places.add(tar.pos())
          }
        } else {
          const nextCell = unit.selectNextCell(units.filter(u => !u.isDead), places);
          if (!nextCell) {
            continue
          }
          const prevPos = unit.pos();
          unit.updatePos(...nextCell.split(',').map(e => +e));
          places.delete(unit.pos());
          places.add(prevPos);
          const target = unit.getTargetInRange(places, units.filter(u => !u.isDead));
          if (target.length > 0) {
            let tar = target[0];
            if (tar.receiveHit(unit.atk)) {
              places.add(tar.pos())
            }
          }
        }
      }
      round++;
    }

  })
    .catch(err => console.log(err))
};

class Unit {

  constructor(r, c, type) {
    this.r = r;
    this.c = c;
    this.hp = 200;
    this.atk = 3;
    this.type = type;
    this.isDead = false;
  }

  updatePos(r, c) {
    this.r = r;
    this.c = c;
  }

  pos() {
    return `${this.r},${this.c}`
  }

  receiveHit(atk = 3) {
    this.hp -= atk;
    if (this.hp < 0) {
      this.isDead = true;
    }
    return this.hp < 0
  }

  getTargetInRange(places, units) {
    return getAdjacentCells(this.pos())
      .map(c => units.filter(u => u.pos() === c.join(','))[0])
      .filter(u => u)
      .filter(u => u.type !== this.type)
      .sort((a, b) => {
        if (a.hp === b.hp) {
          if (a.r === b.r) {
            return a.c - b.c;
          }
          return a.r - b.r;
        }
        return a.hp - b.hp;
      })
  }

  selectNextCell(units, places) {
    const targets = new Set(units.filter(u => u.type !== this.type).reduce((acc, curr) => {
      acc.push(...[
        [curr.r - 1, curr.c].join(','),
        [curr.r, curr.c - 1].join(','),
        [curr.r, curr.c + 1].join(','),
        [curr.r + 1, curr.c].join(',')]
        .filter(cell => {
          return places.has(cell);
        }));
      return acc;
    }, []));

    const visited = new Set();
    visited.add(this.pos());
    let paths = [[this.pos()]];
    while (true) {
      const newPath = [];
      let targetPath = [];
      paths.forEach((path) => {
        const adjacents = getAdjacentCells(path[path.length - 1]).filter(c => places.has(c.join(',')));
        adjacents.forEach((adj) => {
          const rc = adj.join(',');
          if (targets.has(rc)) {
            targetPath.push([...path, rc]);
          } else if (!visited.has(rc) && places.has(rc)) {
            newPath.push([...path, rc]);
          }
          visited.add(rc);
        });
      });
      if (targetPath.length > 0) {
        targetPath = targetPath.sort((a, b) => {
          const [ar, ac] = a[a.length - 1].split(',').map(Number);
          const [br, bc] = b[b.length - 1].split(',').map(Number);
          if (ar === br) {
            return ac - bc;
          }
          return ar - br
        });
        return targetPath[0][1];
      }
      paths = newPath;
      if (paths.length === 0) {
        return null
      }
    }
  }
}

partOne();

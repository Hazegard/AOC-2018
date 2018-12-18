const inputs = require('./Inputs');
const clay = '#';
const sand = '.';
const falling = '|';
const resting = '~';
const printGrid = (grid) => {
  let g = '';
  for (let y = 0; y < grid.length; y++) {
    let r = grid[y];
    let row = '';
    for (let x = 0; x < r.length; x++) {
      row += r[x];
    }
    row += ' ' + y + '\n';
    g += row;
  }
  console.log(g);
};
const partOne = () => {
  return inputs.getDay(17).then((res) => {
    let [xMin, xMax, yMin, yMax] = [Number.MAX_VALUE, -Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE];
    const values = res.split('\n')
      .map(e => e.split(', ').map(e => e.trim()))
      .reduce((acc, curr) => {
        if (curr[1].includes('y')) {
          const x = +curr[0].split('=')[1];
          if (x < xMin) {
            xMin = x;
          } else if (x > xMax) {
            xMax = x;
          }
          const [start, end] = curr[1].split('=')[1].split('..').map(e => +e);
          const y = {start, end};
          if (start < yMin) {
            yMin = start;
          }
          if (end > yMax) {
            yMax = end;
          }
          acc.verticale.push({x, y})
        } else {
          const y = +curr[0].split('=')[1].trim();
          if (y < yMin) {
            yMin = y;
          } else if (y > yMax) {
            yMax = y;
          }
          const [start, end] = curr[1].split('=')[1].split('..').map(Number);
          const x = {start, end,};
          if (start < xMin) {
            xMin = start;
          }
          if (end > xMax) {
            xMax = end;
          }
          acc.horizontale.push({x, y})
        }
        return acc
      }, {horizontale: [], verticale: []});
    xMin--;
    const grid = new Array(yMax + 3).fill(null).map(e => new Array(xMax - xMin + 3).fill('.'));
    values.horizontale.forEach((hor) => {
      for (let c = hor.x.start - xMin; c <= hor.x.end - xMin; c++) {
        grid[hor.y][c] = clay;
      }
    });
    values.verticale.forEach((ver) => {
      for (let r = ver.y.start; r <= ver.y.end; r++) {
        grid[r][ver.x - xMin] = clay;
      }
    });

    const fillFrom = (grid, point) => {
      const [x, y] = point;
      if (y >= yMax) {
        return
      }
      if (isBetweenWalls(grid, point)) {
        fillToLevel(grid, point)
      }
      if (grid[y + 1][x] === sand) {
        grid[y + 1][x] = falling;
        fillFrom(grid, [x, y + 1]);
      }
      if ('#~'.includes(grid[y + 1][x])) {
        if (grid[y][x - 1] === sand) {
          grid[y][x - 1] = falling;
          fillFrom(grid, [x - 1, y]);
        }
        if (grid[y][x + 1] === sand) {
          grid[y][x + 1] = falling;
          fillFrom(grid, [x + 1, y]);
        }
      }
    };

    const fillToLevel = (grid, point) => {
      fillSides(grid, point, 1);
      fillSides(grid, point, -1);
    };

    const fillSides = (grid, point, xRelative) => {
      const [x, y] = point;
      let currX = x;
      while (true) {
        if (grid[y][currX] === clay) {
          return;
        }
        grid[y][currX] = resting;
        currX += xRelative;
      }
    };

    const containsWall = (grid, point, xRelative) => {
      const [x, y] = point;
      let currX = x;
      while (true) {
        if (grid[y][currX] === sand) {
          return false;
        }
        if (grid[y][currX] === clay) {
          return true;
        }
        currX += xRelative;
        if (currX < 0 || currX === xMax) {
          return false;
        }

      }
    };

    const isBetweenWalls = (grid, point) => {
      return containsWall(grid, point, 1) && containsWall(grid, point, -1);
    };

    fillFrom(grid, [500 - xMin, 0]);

    let water = 0;
    let rest = 0;
    for (let y = yMin; y <= yMax; y++) {
      for (let x = 0; x <= xMax - xMin + 1; x++) {
        if (grid[y][x] === resting) {
          water++;
          rest++;
        }
        if (grid[y][x] === falling) {
          water++;
        }
      }
    }
    console.log(water);
    console.log(rest);
  })
    .catch(err => console.log(err));
};

partOne();
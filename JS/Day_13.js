const inputs = require('./Inputs');


const toto = '/>-<\\  \n' +
  '|   |  \n' +
  '| /<+-\\\n' +
  '| | | v\n' +
  '\\>+</ |\n' +
  '  |   ^\n' +
  '  \\<->/\n';

const partOne = () => {
  inputs.getDay(13).then((res) => {
    let map = res.split('\n').map(e => e.split(''));
    let carts = {};
    let nbCarts = 0;
    for (let r = 0; r < map.length; r++) {
      const row = map[r];
      for (let c = 0; c < row.length; c++) {
        if ('<>^v'.includes(row[c])) {
          nbCarts++;
          carts[r + "," + c] = new Cart(r, c, row[c]);
          if (row[c] === '>' || row[c] === '<') {
            map[r][c] = "-"
          } else if (row[c] === '^' || row[c] === 'v') {
            map[r][c] = "|"
          }
        }
      }
    }
    let firstCrash = true;
    let lastkey = '';
    while (nbCarts > 1) {
      const newCarts = {};
      for (let position of Object.keys(carts).sort((a, b) => {
        const br = +b.split(',')[0];
        const ar = +a.split(',')[0];
        if (ar === br) {
          const ac = +a.split(',')[1];
          const bc = +b.split(',')[1];
          return ac - bc;
        }
        return ar - br;
      })) {
        if (!carts[position]) {
          continue
        }
        const newCart = carts[position].move(map);
        const newCartKey = newCart.r + "," + newCart.c;
        lastkey = newCartKey;
        if (newCarts[newCartKey] || carts[newCartKey]) {
          if (firstCrash) {
            console.log(newCartKey.split(',').reverse().join());
            firstCrash = false;
          }
          delete newCarts[newCartKey];
          delete carts[newCartKey];
          nbCarts -= 2;
        } else {
          newCarts[newCartKey] = newCart;
        }
        delete carts[position];
      }
      carts = newCarts;
    }
    const lastCart = Object.keys(carts)[0].split(',').reverse().join()
    console.log(lastCart);
  })
    .catch(err => console.log(err))
};

const printMap = (map, carts) => {
  const map1 = [...map.map(e => [...e])];
  if (carts) {
    Object.keys(carts).forEach((key) => {
      const r = +key.split(',')[0];
      const c = +key.split(',')[1];
      map1[r][c] = carts[key].face;
    })
  }
  const m = map1.map(r => r.join('')).join('\n');
  console.log(m);
};


class Cart {
  constructor(r, c, face) {
    this.r = r;
    this.c = c;
    this.face = face;
    this.nextTurn = 'L';
  }

  move(map) {
    switch (this.face) {
      case '<':
        this.c--;
        break;
      case '>':
        this.c++;
        break;
      case 'v':
        this.r++;
        break;
      case '^':
        this.r--;
        break;
      default:
        console.log(`Error: face §${this.face}, {c:${this.c},r:${this.r}§`);
    }
    this.face = this.newFace(map[this.r][this.c]);
    return this;
  }

  turnRight() {
    switch (this.face) {
      case '>':
        return 'v';
      case  'v':
        return '<';
      case'<':
        return '^';
      case '^':
        return '>';
      default:
        console.log(`Error: turnRight §${this.face}, {c:${this.c},r:${this.r}§`);
    }
  }

  turnLeft() {
    switch (this.face) {
      case '>':
        return '^';
      case  'v':
        return '>';
      case'<':
        return 'v';
      case '^':
        return '<';
      default:
        console.log(`Error: turnLeft §${this.face}, {c:${this.c},r:${this.r}§`);
    }

  }

  turnIntersect() {
    switch (this.nextTurn) {
      case 'L':
        this.nextTurn = 'S';
        return this.turnLeft();
      case 'S':
        this.nextTurn = 'R';
        return this.face;
      case 'R':
        this.nextTurn = 'L';
        return this.turnRight();
    }
  }

  newFace(currentSegment) {
    switch (currentSegment + this.face) {
      case '\\>':
        return this.turnRight();
      case '\\<':
        return this.turnRight();
      case  '\\v':
        return this.turnLeft();
      case '\\^':
        return this.turnLeft();

      case '/>':
        return this.turnLeft();
      case '/<':
        return this.turnLeft();
      case  '/v':
        return this.turnRight();
      case '/^':
        return this.turnRight();
      case '->':
      case '-<':
      case '|v':
      case '|^':
        return this.face;
      case '+>':
      case '+<':
      case '+v':
      case '+^':
        return this.turnIntersect();
      default:
        console.log(`Error: currentSegment §${currentSegment + this.face}, {c:${this.c},r:${this.r}§`);
    }
  }
}

partOne();

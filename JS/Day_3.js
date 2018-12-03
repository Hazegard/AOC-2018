const inputs = require('./Inputs');

const partOne = () => {
  inputs.getDay(3).then((res) => {
      const values = res.split('\n')
        .map(e => e.split('@')[1].trim())
        .map(e => {
          const v = e.split(':');
          const o = v[0].split(',');
          const origin = {x: parseInt(o[0].trim()), y: parseInt(o[1].trim())};
          const d = v[1].split('x');
          const dimens = {x: parseInt(d[0].trim()), y: parseInt(d[1].trim())};
          return {
            origin,
            dimens,
          }
        });
      const array = Array(1000)
        .fill(null)
        .map(() => Array(1000).fill(0));
      values.forEach((elt) => {
        for (let x = elt.origin.x; x < elt.origin.x + elt.dimens.x; x++) {
          for (let y = elt.origin.y; y < elt.origin.y + elt.dimens.y; y++) {
            array[x][y] = array[x][y] + 1;
          }
        }
      });
      let c = 0;
      array.forEach((elt) => {
        c += elt.filter(e => e >= 2).length
      });
      console.log(c);
    }
  )
    .catch(err => console.log(err));
};

partOne();




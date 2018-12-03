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

const partTwo = () => {
  inputs.getDay(3).then((res) => {
    const values = res.split('\n')
      .map(e => {
        const ee = e.split('@');
        const id = ee[0].trim();
        const v = ee[1].trim().split(':');
        const o = v[0].split(',');

        const origin = {x: parseInt(o[0].trim()), y: parseInt(o[1].trim())};
        const d = v[1].split('x');
        const dimens = {x: parseInt(d[0].trim()), y: parseInt(d[1].trim())};
        return {
          id,
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
    values.forEach((elt) => {
      let isAlone = true;
      l1:for (let x = elt.origin.x; x < elt.origin.x + elt.dimens.x; x++) {
        for (let y = elt.origin.y; y < elt.origin.y + elt.dimens.y; y++) {
          if (array[x][y] >= 2) {
            isAlone = false;
            break l1
          }
        }
      }
      if (isAlone) {
        console.log(elt);
      }
    })
  })
};

partTwo();

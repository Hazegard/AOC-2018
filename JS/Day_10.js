const inputs = require('./Inputs');

const getMax = (array, axis) => {
  return array.reduce((acc, curr) => acc > curr.position[axis] ? acc : curr.position[axis], Number.MIN_VALUE);
};
const getMin = (array, axis) => {
  return array.reduce((acc, curr) => acc < curr.position[axis] ? acc : curr.position[axis], Number.MAX_VALUE);
};

const getSize = (array) => {


  const minX = getMin(array, 'x');
  const minY = getMin(array, 'y');
  const maxX = getMax(array, 'x');
  const maxY = getMax(array, 'y');
  return (maxX - minX) * (maxY - minY);

};

const partOne = () => {
  inputs.getDay(10).then((res) => {
    const lines = res.split('\n');
    const points = lines.map(l => {
      const x = +l.split('<')[1].split(',')[0].trim();
      const y = +l.split('>')[0].split(',')[1].trim();
      const vx = +l.split('<')[2].split(',')[0].trim();
      const vy = +l.split(',')[2].split('>')[0].trim();
      return {
        position: {
          x,
          y,
        },
        velocity: {
          x: vx,
          y: vy,
        },
      }
    });
    let lastSize = getSize(points) + 1;
    let sec =0;
    while (true) {
      for (let i = 0; i < points.length; i++) {
        points[i].position.x += points[i].velocity.x;
        points[i].position.y += points[i].velocity.y;
      }
      const currSize = getSize(points);
      if (currSize > lastSize) {
        for (let i = 0; i < points.length; i++) {
          points[i].position.x -= points[i].velocity.x;
          points[i].position.y -= points[i].velocity.y;
        }
        lastSize = getSize(points);
        break
      }
      lastSize = currSize;
      sec++
    }
    const values = points.reduce((acc, curr) => {
      acc.push([curr.position.x, curr.position.y]);
      return acc
    }, []).sort();
    const minX = getMin(points, 'x');
    const minY = getMin(points, 'y');
    const maxX = getMax(points, 'x');
    const maxY = getMax(points, 'y');
    const full = '█';

    let draw = Array(maxY - minY + 1).fill(null)
      .map(() => Array(maxX - minX + 1)
        .fill(' '));

    for (const value of values) {
      draw[value[1]-minY][value[0]-minX] = full;
    }
    console.log(draw.map(e => e.join('')).join('\n'));
    console.log(sec);
  })
    .catch(err => console.log(err));
};

partOne();
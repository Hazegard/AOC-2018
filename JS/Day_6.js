const inputs = require('./Inputs');
const test = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;

const getDistance = (x, y) => {
    return Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]);
};

const partOne = () => {
    inputs.getDay(6).then((res) => {
            const values = res.split('\n').map(e => [+e.split(',')[0], +e.split(',')[1].trim()]);
            let max = values.reduce((acc, curr) => {
                const localMax = curr[0] > curr[1] ? curr[0] : curr[1];
                return localMax > acc ? localMax : acc;
            }, 0);

            const array = Array(max)
                .fill(null)
                .map(() => Array(max).fill(null).map(() => Array(values.length).fill(0)));

            for (let i = 0; i < max; i++) {
                for (let j = 0; j < max; j++) {
                    for (let k = 0; k < values.length; k++) {
                        array[j][i][k] = getDistance(values[k], [i, j]);
                    }
                }
            }
            for (let i = 0; i < max; i++) {
                for (let j = 0; j < max; j++) {
                    let distMax = {index: 10000, val: 100000};
                    for (let k = 0; k < values.length; k++) {
                        if (array[i][j][k] < distMax.val) {
                            distMax.index = k;
                            distMax.val = array[i][j][k];
                        }
                    }
                    if (array[i][j].filter(e => e === distMax.val).length > 1) {
                        distMax.index = -1;
                        distMax.val = -1;
                    }
                    array[i][j] = distMax;
                }
            }


            let areas = {};
            for (let i = 0; i < max; i++) {
                for (let j = 0; j < max; j++) {
                    areas[array[i][j].index] = (areas[array[i][j].index] || 0) + 1;
                    array[i][j] = array[i][j].index
                }
            }

            const t = {};
            for (let i = 0; i < max; i++) {
                for (let j = 0; j < max; j++) {
                    if (i === 0 || j === 0 || i === max || j === max) {
                        t[array[i][j]] = null;
                    } else if (t[array[i][j]] !== null) {
                        t[array[i][j]] = (t[array[i][j]] || 0) + 1;
                    }
                }
            }
            const response = Object.keys(t).reduce((acc, curr) => {
                acc = acc > t[curr] ? acc : t[curr];
                return acc;
            });
            console.log(response);
        }
    )
        .catch(err => console.log(err));
};

partOne();

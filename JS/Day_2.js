const inputs = require('./Inputs');

const test = `abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`;
const partOne = () => {
    inputs.getDay(2).then((res) => {
        const values = res.split('\n');
        let three = 0;
        let two = 0;
        const a = values.reduce((acc, curr) => {
            const b = curr.split('')
                .sort()
                .reduce((letter, elt) => {
                    letter[elt] = (letter[elt] | 0) + 1;
                    return letter;
                }, {});
            const c = Object.keys(b).reduce((acc, curr) => {
                if (b[curr] === 2) {
                    acc.two = 1;
                } else if (b[curr] === 3) {
                    acc.three = 1;
                }
                return acc;
            }, {
                two: 0,
                three: 0,
            });
            acc.two += c.two;
            acc.three += c.three;
            return acc;
        }, {
            two: 0,
            three: 0,
        });
        console.log(a.three * a.two);
    })
        .catch(err => console.log(err))
};

partOne();

const partTwo = () => {
    inputs.getDay(2).then((res) => {
        const values = res.split('\n');
        for (let i = 0; i < res.length - 1; i++) {
            if (!values[i]) {
                break;
            }
            const a = values[i].split('');
            for (let j = i + 1; j < res.length; j++) {
                if (!values[j]) {
                    break;
                }
                const b = values[j].split('');
                let test = 0;
                for (let k = 0; k < a.length; k++) {
                    if (a[k] !== b[k]) {
                        test++;
                    }
                    if (test === 2) {
                        break;
                    }
                }
                if (test === 1) {
                    const response = [];
                    for (let u = 0; u < a.length; u++) {
                        if (a[u] === b[u]) {
                            response.push(a[u])
                        }
                    }
                    console.log(a.join(''));
                    console.log(response.join(''));
                }
            }
        }
    }).catch(err => console.log(err))
};

partTwo();
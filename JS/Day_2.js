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
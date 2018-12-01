const inputs = require('./Inputs');


const partOne = () => {
    inputs.getDay(1).then((res) => {
        const values = res.split('\n');
        return values.reduce((acc, curr) => {
            return eval(`acc${curr}`)
        }, 0);
    }).then((res) => {
        console.log(res);
    });
};

partOne();

const partTwo = () => {
    inputs.getDay(1).then((res) => {
        const frequencies = new Set([0]);
        let freq = 0;
        const values = res.split('\n').map(x => parseInt(x));
        let i = 0;
        while (true) {
            freq += values[i % values.length];
            if (frequencies.has(freq)) {
                break
            }
            frequencies.add(freq);
            i++;
        }
        console.log(freq);
    })
};

partTwo()
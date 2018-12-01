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
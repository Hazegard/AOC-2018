const inputs = require('./Inputs');

const partOne = () => {
    inputs.getDay(9).then((res) => {
        const lastMarble = res.split(' ')[6];
        const players = new Array(+res.split(' ')[0]).fill(0);
        const marbles = [];
        const marble0 = new Marble(0, 0, 0);
        let currentMarble = marble0;
        marbles.push(currentMarble);
        for (let i = 1; i <= lastMarble; i++) {
            if (i % 23 === 0) {
                players[(i % players.length)] += i;
                let localMarble = currentMarble;
                let j = 7;
                while (j-- > 0) {
                    localMarble = marbles[localMarble.previousIndex];
                }
                marbles[localMarble.value] = null;
                players[i % players.length] += localMarble.value;
                marbles[localMarble.previousIndex].nextIndex = localMarble.nextIndex;
                marbles[localMarble.nextIndex].previousIndex = localMarble.previousIndex;
                currentMarble = marbles[localMarble.nextIndex];
                marbles.push(null);
                continue
            }

            const marble = new Marble(i, currentMarble.nextIndex,
                marbles[currentMarble.nextIndex].nextIndex);
            marbles.push(marble);
            marbles[marbles[currentMarble.nextIndex].nextIndex].previousIndex = marble.value;
            marbles[currentMarble.nextIndex].nextIndex = marble.value;
            currentMarble = marble;
        }
        console.log(players.reduce((acc, curr) => acc > curr ? acc : curr, 0));
    }).catch(err => console.log(err));
};

class Marble {
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get previousIndex() {
        return this._previousIndex;
    }

    set previousIndex(value) {
        this._previousIndex = value;
    }

    get nextIndex() {
        return this._nextIndex;
    }

    set nextIndex(value) {
        this._nextIndex = value;
    }

    constructor(value, previousIndex, nextIndex) {
        this._value = value;
        this._previousIndex = previousIndex;
        this._nextIndex = nextIndex;
    }

}

partOne();
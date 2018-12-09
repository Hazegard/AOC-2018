const inputs = require('./Inputs');
const test = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
const partOne = () => {

    inputs.getDay(8).then((res) => {

        const tree = res.split(' ').map(e => +e);
        const getSum = () => {
            let nChildNodes = tree.shift();
            let nMetadata = tree.shift();

            let response = 0;
            while (nChildNodes > 0) {
                response += getSum()
                nChildNodes--;
            }
            while (nMetadata > 0) {
                response += tree.shift();
                nMetadata--;
            }
            return response;
        }

        console.log(getSum());

    }).catch(err => console.log(err))
}


class Node {
    constructor(tree, startIndex) {
        this.startIndex = startIndex;
        this.tree = tree;
        this.nChildNodes = +tree[startIndex];
        this.nMetadata = +tree[startIndex + 1];
        this.childNodes = new Array(this.nChildNodes);
        this.createChildren();
        this.length = this.getLength();
    }

    createChildren() {
        for (let i = 0; i < this.nChildNodes; i++) {
            const start = this.startIndex + (i > 0 ? 2 + this.childNodes[i - 1].getLength() : 2);
            this.childNodes[i] = new Node(this.tree, start)
        }
    }

    getLength() {
        if (this.nChildNodes === 0) {
            return 2 + this.nMetadata
        }
        return this.childNodes.reduce((acc, curr) => {
            return acc + curr.getLength();
        }, 2 + this.nMetadata)
    }

    getSumMetadata() {
        let sum = 0;
        for (let i = this.startIndex + this.length - this.nMetadata; i < this.startIndex + this.length; i++) {
            sum += this.tree[i];
        }
        return this.childNodes.reduce((acc, curr) => {
            return acc + curr.getSumMetadata();
        }, sum)
    }
}

partOne();

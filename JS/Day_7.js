const inputs = require('./Inputs');
const test = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
const partOne = () => {
    const getALlLetters = (lines) => {
        const letters = [];
        lines.forEach((line) => {
            letters.push(...[line.split(' ')[1], line.split(' ')[7]])
        });
        return letters.filter((el, i, a) => i === a.indexOf(el) ? 1 : 0).sort()
    };

    inputs.getDay(7).then((res) => {
        const values = res.split('\n');
        const letters = getALlLetters(values);
        let steps = [];
        values.forEach((line) => {
            const l = line.split(' ');
            const currentStep = l[1];
            const previousStep = l[7];
            steps.push({currentStep, previousStep})
        });
        const response = [];
        while (steps.length !== 0) {
            const curr = steps.map(s => s.currentStep);
            const prev = steps.map(s => s.previousStep);
            const toto = curr.filter((e) => !prev.includes(e))
                .filter((el, i, a) => i === a.indexOf(el) ? 1 : 0)
                .sort()[0];
            response.push(toto);
            steps = steps.filter(e => toto !== e.currentStep);

        }
        const last = letters.filter((l) => !response.includes(l));
        console.log([...response, last].join(''));

    })

};

partOne();
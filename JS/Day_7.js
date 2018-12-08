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

const partTwo = () => {
    const getALlLetters = (lines) => {
        const letters = [];
        lines.forEach((line) => {
            letters.push(...[line.split(' ')[1], line.split(' ')[7]])
        });
        return letters.filter((el, i, a) => i === a.indexOf(el) ? 1 : 0).sort()
    };

    const getNextStep = (steps, workingSteps, lettersToDo) => {
        return lettersToDo.filter((l) => {
            if (workingSteps.includes(l)) {
                return false;
            }

            for (let i = 0; i < steps.length; i++) {
                const s = steps[i];


                if (s.currentStep === l) {
                    return false;
                }
            }
            return true;
        }).sort()[0]
    };

    const getStepDuration = (stepLetter) => {
        return stepLetter.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + 60;
    };

    const assignWorker = (steps, workingSteps, letters) => {
        const nextStep = getNextStep(steps, workingSteps, letters);
        if (nextStep) {
            return {
                time: getStepDuration(nextStep),
                step: nextStep,
            }
        }
    };

    const workers = new Array(5);
    inputs.getDay(7)
        .then((res) => {
            const values = res.split('\n');
            let letters = getALlLetters(values);
            let steps = [];
            values.forEach((line) => {
                const l = line.split(' ');
                const currentStep = l[7];
                const previousStep = l[1];
                steps.push({previousStep, currentStep})
            });
            const done = [];
            let workingSteps = [];
            let time = 0;
            while (letters.length !== 0) {
                for (let i = 0; i < workers.length; i++) {
                    if (!workers[i]) {
                        workers[i] = assignWorker(steps, workingSteps, letters);
                        if (workers[i]) {
                            workingSteps.push(getNextStep(steps, workingSteps, letters));
                            letters = letters.filter(l => !workingSteps.includes(l))

                        }
                    } else {
                        workers[i].time--;
                        if (workers[i].time === 0) {
                            done.push(workers[i].step);
                            steps = steps.filter(s => s.previousStep !== workers[i].step);
                            workingSteps = workingSteps.filter(w => w !== workers[i].step);
                            workers[i] = assignWorker(steps, workingSteps, letters);

                            if (workers[i]) {
                                workingSteps.push(getNextStep(steps, workingSteps, letters));
                                letters = letters.filter(l => !workingSteps.includes(l))
                            }

                        }
                    }
                }
                time++;
            }
            time--;
            const lastStep = workers.filter(w => w).reduce((acc, curr) => acc > curr.time ? acc : curr.time, 0);
            console.log(lastStep + time);
        })
        .catch(err => console.log(err));

};

partTwo();
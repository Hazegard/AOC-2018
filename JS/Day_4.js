const inputs = require('./Inputs');
const moment = require('moment');
const test = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;
const partOne = () => {
  const getTime = (val) => {
    const date = val.split(']')[0];
    const time = date.split(' ')[1];
    return {
      minute: parseInt(time.split((':'))[1]),
      hour: parseInt(time.split((':'))[0]),
    }
  };

  const getIntervale = (time1, time2) => {
    return time2.minute - time1.minute - 1;
  };
  const getId = (val) => {
    return parseInt(val.split(' ')[3].split('#')[1])
  };

  const parseDate = (line) => {
    const date = line.split(']')[0].split('[')[1];
    return new moment(date, 'YYYY-MM-DD hh:mm');
  };

  const compare = (line1, line2) => {
    return parseDate(line1).diff(parseDate(line2));
  };

  inputs.getDay(4).then((res) => {
    const lines = res.split('\n').sort(compare);

    lines.forEach((line) => {
      //console.log(line);
    })
    let sleepTime = {};
    let start = null;
    let end = null;
    let guardId = 0;
    let currentGuardId = 0;
    let currentSleepTIme = 0;
    lines.forEach((line) => {
        if (line.includes('begins shift')) {
          currentSleepTIme = 0;
          currentGuardId = getId(line);
          sleepTime[currentGuardId] = sleepTime[currentGuardId] || {sleepTime: 0, sleepMost: {}};
        }
        if (line.includes('falls asleep')) {
          start = getTime(line);
        }
        if (line.includes('wakes up')) {
          end = getTime(line);
          const currentSleep = getIntervale(start, end);
          sleepTime[currentGuardId].sleepTime = (sleepTime[currentGuardId].sleepTime | 0) + currentSleep;
          for (let i = start.minute; i < end.minute; i++) {
            sleepTime[currentGuardId].sleepMost[i] = (sleepTime[currentGuardId].sleepMost[i] || 0) + 1;
          }
        }
      }
    );
    let maxSleep = 0;
    let chosenGuard;
    Object.keys(sleepTime).forEach((id) => {
      const guard = sleepTime[id];
      if (guard.sleepTime > maxSleep) {
        chosenGuard = id;
        maxSleep = guard.sleepTime
      }
    });
    let bestMinutes = {
      minute: 0,
      occurence: 0,
    };
    Object.keys(sleepTime[chosenGuard].sleepMost).forEach((id) => {
      const val = sleepTime[chosenGuard].sleepMost[id]
      if (val > bestMinutes.occurence) {
        console.log(id);
        bestMinutes.minute = parseInt(id);
        bestMinutes.occurence = parseInt(val)
      }
    });

    console.log(bestMinutes.minute * chosenGuard);
  })
    .catch(err => console.log(err));
};

partOne();
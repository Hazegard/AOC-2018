const https = require('https');
const fs = require('fs');

module.exports.getDay = async (day) => {
    const filePath = `./inputs/${day}.txt`;
    if (!fs.existsSync(filePath)) {
        const options = {
            hostname: 'adventofcode.com',
            port: 443,
            path: `/2018/day/${day}/input`,
            method: 'GET',
            header: {
                'Cookie': `session=${process.env.SESSION_ID}`
            },
        };
        const file = fs.createWriteStream(filePath);
        return new Promise((resolve, reject) => {
            console.log('ttt');
            https.request(options, (res) => {
                console.log(res);
                res.pipe(file);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            })
        })
    }
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}
;

const fs = require('fs');
const cliProgress = require('cli-progress');

function writePostgresCSV(headers, filename, columns, stringLoops, dataGenerator) {
    const b1 = new cliProgress.SingleBar({
        format: 'CLI Progress for ' + filename + ' |' + '| {bar} || {percentage}% || {value}/{total} Chunks || Speed: {speed}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    b1.start(columns, 0, {
        speed: "N/A"
    });
    var wstream = fs.createWriteStream(filename)
    let stringToWrite
    wstream.write(headers)
    for (var i = 0; i < Math.ceil(columns / stringLoops); i++) {
        stringToWrite = ''
        for (var j = 0; j < stringLoops; j++) {
            stringToWrite = stringToWrite + dataGenerator(i * stringLoops + j)
        }
        wstream.write(stringToWrite, (err) => {
            if (err) { }
            else if (j === stringLoops) {
                b1.stop()
            }
        })
        b1.increment(stringLoops)
    }
    wstream.end()
};


module.exports = writePostgresCSV;

const parser = require('./ContentParser')
const fs = require('fs')
const fileContent = fs.readFileSync(__dirname + '/data/data.txt', 'utf8')
const employees = parser(fileContent);
const bestMatchesFinder = require('./bestMatchesFinder');

console.time('test2')

const result = bestMatchesFinder(employees)

const bestMatchesIds = result.bestMatches.ids

for (const id in bestMatchesIds) {
    console.log(`
        Employee with id ${id} spend most of his time worked mostly with Employee/s ${bestMatchesIds[id].join(', ')} for about ${result.bestMatches.value} hours`)
}

console.timeEnd('test2')
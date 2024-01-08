const papaParse = require('papaparse')
const fs = require('fs')
const matches = fs.readFileSync('../data/matches.csv', 'utf-8')

const matchData = papaParse.parse(matches, {
    header: true
})

const finalMatchData = matchData['data']


module.exports = finalMatchData;
const papaParse = require('papaparse')
const fs = require('fs')
const deliveries = fs.readFileSync('../data/deliveries.csv', 'utf-8')

const deliverydata = papaParse.parse(deliveries, {
    header: true
})
const finaldeliverydata = deliverydata['data']

module.exports = finaldeliverydata
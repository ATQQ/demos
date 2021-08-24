// const m1 = require('./test-module')
// m1.name = '2'
// console.log(m1.name);

// delete require.cache[`${__dirname}/test-module.js`]
// const m2 = require('./test-module')
// console.log(m2.name);

const fs = require('fs')
fs.readFileSync()

const d1 = require('./test.json')
console.log(d1);
const d2 = require('./test')
console.log(d2);
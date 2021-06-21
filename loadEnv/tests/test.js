// const dotenv = require('dotenv')

// const res = dotenv.config()

// console.log(res);

// console.log(process.env.DB_PORT);


// ----------

// const baseDir = process.cwd()

// const res1 = dotenv.config({path:`${baseDir}/.lalala`})
// const res2 = dotenv.config({path:`${baseDir}/.lalala2`})
// const res3 = dotenv.config({path:`${baseDir}/.不存在`})

// console.log(res1);
// console.log(res2);
// console.log(res3);
// console.log(process.env.TEST_ENV);

// ----------
// function load(parseEnvObj) {
//     const { parsed } = parseEnvObj
//     if (parsed && parsed instanceof Object) {
//         Object.getOwnPropertyNames(parsed).forEach((k) => {
//             process.env[k] = parsed[k]
//         })
//     }
// }
// const baseDir = process.cwd()

// const res1 = dotenv.config({ path: `${baseDir}/.lalala` })
// const res2 = dotenv.config({ path: `${baseDir}/.lalala2` })
// const res3 = dotenv.config({ path: `${baseDir}/.不存在` })

// load(res1);
// load(res2);
// load(res3);
// console.log(process.env.TEST_ENV);
// ----------

const loadEnv = require('./../index')
loadEnv()
// loadEnv({ prefix: 'SUGAR' })
console.log(process.env.DB_USER);
console.log(process.env.SUGAR_USER);
console.log(process.env.ABC_SUGAR_USER);

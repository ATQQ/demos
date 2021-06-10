const { ObjectId } = require('mongodb')
const { MyObjectId } = require('./myObjectId')
console.log(new ObjectId().toHexString());
console.log(new ObjectId().toHexString());
console.log(new ObjectId().toHexString());
console.log(new MyObjectId().toHexString());
console.log(new MyObjectId().toHexString());
console.log(new MyObjectId().toHexString());

# 源码学习：MongoDB-ObjectId方法学习

## MyObjectId
```js
const randomBytes = require('crypto').randomBytes
const kId = Symbol('id');

let PROCESS_UNIQUE = null;

class MyObjectId {
    static index = ~~(Math.random() * 0xffffff)
    constructor(id) {
        if (id == null || typeof id === 'number') {
            this[kId] = MyObjectId.generate(typeof id === 'number' ? id : undefined);
        }
    }
    static getInc() {
      return (MyObjectId.index = (MyObjectId.index + 1) % 0xffffff);
    }
    static generate(time) {
        if ('number' !== typeof time) {
            time = ~~(Date.now() / 1000);
        }

        const inc = MyObjectId.getInc();
        const buffer = Buffer.alloc(12);

        // 4-byte timestamp
        buffer.writeUInt32BE(time, 0);

        // set PROCESS_UNIQUE if yet not initialized
        if (PROCESS_UNIQUE === null) {
            PROCESS_UNIQUE = randomBytes(5);
        }

        // 5-byte process unique
        buffer[4] = PROCESS_UNIQUE[0];
        buffer[5] = PROCESS_UNIQUE[1];
        buffer[6] = PROCESS_UNIQUE[2];
        buffer[7] = PROCESS_UNIQUE[3];
        buffer[8] = PROCESS_UNIQUE[4];

        // 3-byte counter
        buffer[11] = inc & 0xff;
        buffer[10] = (inc >> 8) & 0xff;
        buffer[9] = (inc >> 16) & 0xff;

        return buffer;
    }
    toHexString(){
        return this[kId].toString('hex')
    }
}

module.exports = {
    MyObjectId
}
```
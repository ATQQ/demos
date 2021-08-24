var player = require('play-sound')(opts = {})
const path = require('path')
const os = require('os')

console.log(os.type());
player.play(path.join(__dirname,'assets/success.wav'), function (err) {
    if (err) throw err
})

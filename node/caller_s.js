const ws = new WebSocket('ws://ec2-54-242-86-211.compute-1.amazonaws.com:8000/');
/* opus!! */
var opus = require('node-opus');
/* mic module */
var mic = require('mic');

var micInstance = mic({
    rate: '44100',
    bitwidth: 16,
    channels: '2',
    debug: true,
    exitOnSilence: 0
});

var micInputStream = micInstance.getAudioStream();

var encoder = new opus.OpusEncoder(48000);

start();

ws.on('open', open());

var open = function() {
    micInputStream.on('data', function(data) {
        var encoded = encoder.encode(data, 10);
        ws.send(encoded);
    });
}

var start = function() {
    micInstance.start();
}

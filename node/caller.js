/* ws */
const WebSocket = require('ws');
/* opus!! */
var opus = require('node-opus');
/* mic module */
var mic = require('mic');
// /* file I/O */
// var fs = require('fs');


/*============ constructing ws   ============*/
// var websocket = require('websocket-stream')
// var ws = websocket('ws://ec2-54-242-86-211.compute-1.amazonaws.com:8000/')
// ws.pipe(opusEncodeStream);

const ws = new WebSocket('ws://ec2-54-242-86-211.compute-1.amazonaws.com:8000/');
//
ws.on('open', function open() {
    sendData(ws);

//     const array = new Float32Array(5);
//
//     for (var i = 0; i < array.length; ++i) array[i] = i / 2;
//     ws.send(array);
});
//
// // /* since this is a one way communication, there's no need for receiving data */
// // ws.on('message', function incoming(data) {
// //     console.log(data);
// // });



var sendData = function(ws) {
    /*============ constructing opus ============*/
    // Create the encoder.
    // Specify 48kHz sampling rate and 10ms frame size.
    // NOTE: The decoder must use the same values when decoding the packets.
    var rate = 48000;
    var encoder = new opus.OpusEncoder( rate );

    // Encode and decode.
    // var frame_size = rate/100;
    // var encoded = encoder.encode( buffer, frame_size );
    // // var decoded = encoder.decode( encoded, frame_size );

    // or create streams
    var channels = 2;
    var opusEncodeStream = new opus.Encoder(rate, channels);// , frame_size);
    // var opusDecodeStream = new opus.Decoder(rate, channels, frame_size);

    // see examples folder for a more complete example

    /*============ constructing mic =============*/


    /* this creates the object of a mic */
    var micInstance = mic({
        rate: '44100',
        bitwidth: 16,
        channels: '2',
        debug: true,
        exitOnSilence: 0
    });

    /* this uses mic object to capture all the audio input stream */
    var micInputStream = micInstance.getAudioStream();

    /* this opens an empty/new file called output.raw without any encoding,
     * which could be used for OPUS to encode and decode
     */
    // var outputFileStream = fs.WriteStream('output.raw');

    /* piping the stream to output_file_stream */
    // micInputStream.pipe(opusEncodeStream);

    /* when there's data input */
    micInputStream.on('data', function(data) {
        var encoded = encoder.encode( data, 48000/100 );
        ws.send(encoded);
    });
    //
    // micInputStream.on('error', function(err) {
    //     cosole.log("Error in Input Stream: " + err);
    // });
    //
    // micInputStream.on('startComplete', function() {
    //     console.log("Got SIGNAL startComplete");
    //     // setTimeout(function() {
    //     //         micInstance.pause();
    //     // }, 5000);
    // });
    //
    // micInputStream.on('stopComplete', function() {
    //     console.log("Got SIGNAL stopComplete");
    // });
    //
    // micInputStream.on('pauseComplete', function() {
    //     console.log("Got SIGNAL pauseComplete");
    //     // setTimeout(function() {
    //     //     micInstance.resume();
    //     // }, 5000);
    // });
    //
    // micInputStream.on('resumeComplete', function() {
    //     console.log("Got SIGNAL resumeComplete");
    //     // setTimeout(function() {
    //     //     micInstance.stop();
    //     // }, 5000);
    // });
    //
    // micInputStream.on('silence', function() {
    //     console.log("Got SIGNAL silence");
    // });
    //
    // micInputStream.on('processExitComplete', function() {
    //     console.log("Got SIGNAL processExitComplete");
    // });

    micInstance.start();
}

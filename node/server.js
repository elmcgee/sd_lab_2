const WebSocket = require('ws');
const wss1 = new WebSocket.Server({ port: 8000});

var clients = [];

wss.on('connection', function(ws) {
    clients.push(ws);
    ws.on('message', function(message) {
        console.log('received: %s', message);
        sendButSender(message, ws);
    });
    ws.send("NEW USER JOINED");
});

function sendButSender (message, ws) {
    for (var i = 0; i < clients.length; i++) {
        if(ws !== clients[i])
            clients[i].send("Message: " + message);
    }
}

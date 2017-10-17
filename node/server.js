const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        sendButSender(message, ws);
    });
});

function sendButSender (message, ws) {
    wss.clients.forEach(function(client) {
        if(client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

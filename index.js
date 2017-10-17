var socket;
//First test for the browsers support for WebSockets
if (!window.WebSocket) {
    //If the user's browser does not support WebSockets, give an alert message
    alert("Your browser does not support the WebSocket API!");
} else {
    socket = new WebSocket("ws://ec2-54-242-86-211.compute-1.amazonaws.com:8000/");
    socket.onmessage = event => {
        console.log(event.data);
        $("#data_received").html("<p>" + event.data + "</p>");
    }
}

var formSubmit = function() {
    var dataToSend = document.getElementById("sent").value;
    socket.send(dataToSend);
}

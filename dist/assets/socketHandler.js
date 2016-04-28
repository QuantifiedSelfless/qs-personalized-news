var socket = io.connect('http://localhost:3000');
socket.on('rfid', function(data){
    setTimeout(function() {window.location = "http://localhost:8000"}, 2000)
});
//auto logout
setTimeout(function() {window.location="http://localhost:8000"}, 120000);

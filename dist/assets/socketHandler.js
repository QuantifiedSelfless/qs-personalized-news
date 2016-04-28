var socket = io.connect('http://localhost:3000');
var timeoutHandler = null;

socket.on('rfid', function(data){
    setTimeout(function() {window.location = "http://localhost:8000"}, 2000)
});
//auto logout
timeoutHandler = setTimeout(function() {window.location="http://localhost:8000"}, 120000);
//reset the timer onscroll
document.onscroll = function() {
    console.log("scrolled");
    window.clearTimeout(timeoutHandler);
    timeoutHandler = window.setTimeout(function() {window.location="http://localhost:8000"}, 120000);
}


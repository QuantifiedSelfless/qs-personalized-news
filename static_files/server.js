var express = require('express');
var app = express();
var socketio = require('socket.io-client');
const QS_URL="http://quantifiedselfbackend.local:6060/news_processor/news_category?rfid=";
var socket = socketio.connect('http://localhost:3000');
var stories = ['story1', 'story2', 'story3', 'story4', 'story5', 'story6'];
var storyToServe=null;
var storyToRender=null;

socket.on('rfid', function(data){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4 && httpRequest.status === 200){
            var userResponse = JSON.parse(httpRequest.responseText);
            storyToRender = userResponse.data.category;
            if(storyToRender !== null){
                storyToServe=stories[storyToRender];
            }
            else{
                storyToServe=stories[3];
            }
            setTimeout(function() {window.location = "http://localhost:7070/"+storyToServe}, 2000)
        }
        else if(httpRequest.readyState === 4 && httpRequest.status !== 200){
            storyToServe=stories[5];
            setTimeout(function() {window.location = "http://localhost:7070/"+storyToServe}, 2000)
        }
    };
});


app.use(express.static('assets'))
app.get('/', function(req, res){
    res.sendFile(__dirname+'/story1.html');
});

app.get('/story1', function(req, res){
    res.sendFile(__dirname+'/story1.html');
})

app.get('/story2', function(req, res){
    res.sendFile(__dirname+'/story2.html');
})

app.get('/story3', function(req, res){
    res.sendFile(__dirname+'/story3.html');
})

app.get('/story4', function(req, res){
    res.sendFile(__dirname+'/story4.html');
})

app.get('/story5', function(req, res){
    res.sendFile(__dirname+'/story5.html');
})

app.get('/story6', function(req, res){
    res.sendFile(__dirname+'/story6.html');
})

app.listen(7070, function(){
    console.log("listening on port 7070")
})

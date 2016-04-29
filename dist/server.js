var express = require('express');
var app = express();
var http = require('http');
const QS_HOST="http://quantifiedselfbackend.local";
const QS_PORT=6060;
const QS_PATH="/news_processor/news_category?rfid=";
var stories = ['story1', 'story2', 'story3', 'story4', 'story5', 'story6'];
var storyToServe=null;
var storyToRender=null;
var userId=null;
var fullRequestPath=null;

app.use(express.static('assets'))
app.get('/', function(req, res){
    userId = req.query.rfid;
    if(userId === null)
        userId = req.query.userId;
    fullRequestPath = QS_PATH+userId;
    var request = http.get({
        hostname: QS_HOST,
        port: QS_PORT,
        path: fullRequestPath
    }, function(response){
        var responseJSON = JSON.parse(response);
        storyToRender = responseJSON.data.category;
        if(storyToRender !== null){
            storyToServe=stories[storyToRender]
        }
        else{
            sample = Math.floor((Math.random())*6)
            storyToServe=stories[sample] 
        }
        res.sendFile(__dirname+'/'+storyToServe+'.html')
    });
    request.on('error', function(e){
        console.log("QS data host not found");
        sample = Math.floor((Math.random())*6)
        storyToServe=stories[sample]
        res.sendFile(__dirname+'/'+storyToServe+'.html');
    });
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

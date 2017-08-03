
var path = require('path')
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, '/public')))
server.listen(3003)



io.on('connection', function(client){
  client.on('message', function(data){
    client.broadcast.emit('message', data)
    console.log(data)
  });
  client.on('disconnect', function(){
    console.log('disconnect...')
  });
});


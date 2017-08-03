
let path = require('path')
let express = require('express')
let app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server)

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


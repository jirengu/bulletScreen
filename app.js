
var path = require('path')
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

var axios = require('axios')

var API_KEY = '6824998c8b574bd1bba7ba5363a341ab';


app.use(express.static(path.join(__dirname, '/public')))
server.listen(3003)



io.on('connection', function(client){
  client.on('message', function(data){
    if(isDirtyWord(data.message)){
      client.emit('message', {name:'小谷', message: '不要说脏话'})
      return
    }
    client.broadcast.emit('message', data)
    if(isShowRebot(data.message)){
      axios.post('http://www.tuling123.com/openapi/api',{
        key: API_KEY,
        info: data.message,
        usierid: data.name
      }).then(function(res){
        console.log(res.data)
        setTimeout(function(){
          client.emit('message', {name:'小谷', message: res.data.text})
          client.broadcast.emit('message', {name:'小谷', message: res.data.text})
        }, 1200)
        
      })
    }
    

    console.log(data)
  });
  client.on('disconnect', function(){
    console.log('disconnect...')
  });
});


























function isShowRebot(message){
  if(/(小谷)|(饥人谷)|(jirengu)|(jrg)|(老师)/.test(message)){
    return true
  }
  return false
}
function isDirtyWord(message){
  if(/(傻逼)|(笨蛋)|(垃圾)|(逼)|(草)|(操)|(cao)|(2B)|(2b)/.test(message)){
    return true
  }
  return false
}


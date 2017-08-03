/*
var app = {
  init: function(){

  },

  bind: function(){

  }

}

app.init()

*/


var socket = io()


if(localStorage.name){
  document.querySelector('footer .name').innerText = localStorage.name
}


socket.on('message', function(data) {
  console.log('server send...')
  console.log(data)
  addMessage(data.name, data.message)
})


document.querySelector('footer input').onchange = function(){
  var name = localStorage.name || '游客'
  var message = this.value
  addMessage(name, message)
  this.value = ''
  socket.emit('message', {
    name: name,
    message: message
  })
}

document.querySelector('footer .name').onblur = function(e){
  console.log(this.value)
  if(this.innerText == ''){
    alert('名字不能为空')
    this.innerText = localStorage.name || '游客'
    return 
  }
  localStorage.name = this.innerText
}


function addMessage(name, msg){
  var msgNode = document.createElement('div')
  var childSpan = document.createElement('span')
  childSpan.innerText = name + '说:'
  var childText = document.createTextNode(msg)
  msgNode.appendChild(childSpan)
  msgNode.appendChild(childText)
  msgNode.classList.add('message')
  setTimeout(function(){
    msgNode.classList.add('normal')
  }, 2000)
  document.body.querySelector('main').appendChild(msgNode)
  console.log(getComputedStyle(msgNode).width)
}


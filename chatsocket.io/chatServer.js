var express = require('express')
const path = require('path') 
var app = express() 
const port = process.env.PORT || 3000; 
const server = require('http').createServer(app)
  
    
const io = require('socket.io')(server);   
const socket = require('socket.io') 

app.use(express.static(path.join(__dirname, '../Html')));
              
const users = {} 
  
io.on('connection',socket=>{     
    socket.on('new-user-joined',name =>{
        users[socket.id] = name;   
        console.log("new-user",name)             
        socket.broadcast.emit('user-joined',name);
                 
         
    })     
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id])});
        delete users[socket.id];    
    })  
    

server.listen(port,function(socket){  
    console.log("Server listening",port)
})
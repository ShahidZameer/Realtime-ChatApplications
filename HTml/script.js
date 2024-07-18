const socket = io()
   
const name = prompt("Enter your name to join Chat")  
socket.emit('new-user-joined',name)


const messageContainer = document.querySelector('.overflow')
const form = document.getElementById('send-container') 
const messageInput = document.getElementById('messageInp')
const audio = new Audio('ting.mp3')   

const append = (message,position) =>{
const messageElement = document.createElement('div') 
messageElement.innerText = message
messageElement.classList.add('left-message') 
messageElement.classList.add(position) 
messageContainer.append(messageElement)  

     
      
}   

socket.on('user-joined',name =>{
    append(`${name} joined the chat`)
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()  
    const message = messageInput.value
    append(`You ${message}`,'right-message')
    // message.classList.add('right-messgae') 
    socket.emit('send',message); 
    messageInput.value = ''  
   
   
  
})  
 
socket.on('receive',data =>{
    append(`${data.name}: ${data.message}`) 
    audio.play()
})  
socket.on('left',name =>{
    append(`${name} left the chat`) 

})   

   
  
 
// const from = document.getElementsByClassName('input-container')
// const messageInput = document.getElementById("messgaeInp")
// const messageContainer = document.querySelector(".container") 


 
   
const socket = io()
console.log('HELLO')
let user
let chatBox = document.getElementById('chatBox');
Swal.fire({
    title: 'login',
    input: 'text',
    text: 'enter your name',
    allowOutsideClick: false
}).then(result =>{
    user = result.value;
})

chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === "Enter") {
        socket.emit('message', {user, message: chatBox.value})
        chatBox.value= ""
    }
})
//sockets 
socket.on('newUser', () => {
    alert('New user coneccted');
    swal.fire({
        icon: "succes",
        text: "new user coneccted",
        toast: true,
        position: "top-right"
    })
})

socket.on('history', data =>{
    let history = document.getElementById('history');
    let messages = ""
    data.forEach(message =>{
        messages += `${message.user} dice: ${message.message}<br>`
    })
    history.innerHTML = messages;
})
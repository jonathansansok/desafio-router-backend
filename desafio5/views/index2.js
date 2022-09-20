const socket = io()
console.log('HELLO')

//sockets 
socket.on('newUser', () => {
    alert('New user coneccted');
})
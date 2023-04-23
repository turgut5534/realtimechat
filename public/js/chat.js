const socket = io()

const userName = document.querySelector('#user-name').value
const room = document.querySelector('#room-name').value

console.log(room)

$('#message-form').on('submit', function(e) {

    e.preventDefault()

    const message = document.querySelector('#message').value
    socket.emit('sendMessage', message, userName, room, () => {

        console.log('Message has been sent successfuly!')
        document.querySelector('#message').value = ''

    })
})

socket.on('message', (message, userName)=> {
    
    iziToast.success({
        title: userName,
        message: message,
    });

})

socket.emit('join', userName, room)
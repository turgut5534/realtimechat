const socket = io()

const userName = document.querySelector('#user-name').value
const room = document.querySelector('#room-name').value

$('#message-form').on('submit', function(e) {

    e.preventDefault()

    const message = document.querySelector('#message')
    socket.emit('sendMessage', message.value, userName, () => {

        console.log('Message has been sent successfuly!')
        message.value = ''

    })
})

socket.on('message', (message)=> {
    
    iziToast.success({
        title: 'OK',
        message: message,
    });

})

socket.emit('join', userName, room)
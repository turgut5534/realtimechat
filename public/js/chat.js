const socket = io()

$('#message-form').on('submit', function(e) {

    e.preventDefault()

    const message = document.querySelector('#message')
    socket.emit('sendMessage', message.value, () => {

        console.log('Message has been sent successfuly!')
        message.value = ''

    })
})

socket.on('message', (message)=> {
    console.log(message)
})
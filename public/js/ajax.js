$.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    }
});


$('.register-form').on('submit', function(e) {

    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(data) {

            iziToast.success({
                title: 'OK',
                message: data.message,
            });

            $('.register-form')[0].reset(); 

            setTimeout(() => {
                location.href = '/login'
            }, 1000);

        },
        error: function(e) {

            var errorMessage = e.responseJSON.message

            iziToast.error({
                title: 'Error',
                message: errorMessage,
            });
        }
    })

})


$('.login-form').on('submit', function(e) {

    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(data) {

            iziToast.success({
                title: 'OK',
                message: data.message,
            });

            $('.login-form')[0].reset(); 

            setTimeout(() => {
                location.href = '/chat'
            }, 1000);

        },
        error: function(e) {

            var errorMessage = e.responseJSON.message

            iziToast.error({
                title: 'Error',
                message: errorMessage,
            });
        }
    })

})
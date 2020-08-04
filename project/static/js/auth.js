$(function() {
    $('#enter').on('click', function(e){
        e.preventDefault();

        let login = $('#login').val();
        let password = $('#password').val();

        //TODO: сообщение об ошибке
        if(login == '') {
            return;
        }

        if(password == '') {
            return;
        }
                    
        $.ajax({
            url: '/login',
            type: 'POST',
            data: 
            {
                login: login, 
                password: password
            },
        
            success: function(resp) {
                if(resp.result == 1) {
                    window.location.href = resp.msg;
                }
                else {
                    //TODO: сообщение об ошибке
                    console.log(resp.msg);
                }
            }
            
        });
    });
});

//обработка нажатия enter
$(document).on('keypress',function(e) {
    if(e.which === 13) {
        $('#enter').click();
    }
});
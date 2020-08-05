$(function() {
    let user_id_to_delete, user_login_to_delete;

    $('#create_user').on('click', function(e){
        e.preventDefault();

        $('#createModal').modal('show');
    });

    $('.edit_user').on('click', function(e){
        e.preventDefault();

        let user_id = $(this).data('user_id');
    });

    $('.info_user').on('click', function(e){
        e.preventDefault();

        let user_id = $(this).data('user_id');

        alert(user_id);
    });

    $('.delete_user').on('click', function(e){
        e.preventDefault();

        user_id_to_delete = $(this).data('user_id');
        user_login_to_delete = $(this).data('user_login');

        $('#deleteModal').modal('show');
    });

    //создание
    //здесь очистить поля модалки после закрытия
    $('#createModal').on('hidden.bs.modal', function () {
        $('#loginInput').val('');
        $('#nameInput').val('');
        $('#surnameInput').val('');

        $('#roleSelect').val('');

        $('#passwordInput').val('');
        $('#passwordConfirmInput').val('');
        $('#emailInput').val('');
        $('#companyInput').val('');
        $('#departmentInput').val('');
        $('#positionInput').val('');
        $('#commentaryInput').val('');
    });

    $('#create_user_confirm').on('click', function (e) {
        e.preventDefault();

        let login = $('#loginInput').val();

        if(login == '') {
            return;
        }

        let name = $('#nameInput').val();

        if(name == '') {
            return;
        }

        let surname = $('#surnameInput').val();

        if(surname == '') {
            return;
        }

        let patronymic = $('#patronymicInput').val();

        let role_id = $('#roleSelect').val();

        if(role_id == '' || role_id == null) {
            return;
        }

        let password = $('#passwordInput').val();

        if(password == '') {
            return;
        }

        let passwordConfim = $('#passwordConfirmInput').val();

        if(passwordConfim == '') {
            return;
        }

        if(password != passwordConfim) {
            return;
        }

        let email = $('#emailInput').val();

        if(email == '') {
            return;
        }

        let company = $('#companyInput').val();

        if(company == '') {
            return;
        }

        let department = $('#departmentInput').val();
        let position = $('#positionInput').val();
        let commentary = $('#commentaryInput').val();

        $.ajax({
            url: '/create_user_ajax',
            type: 'POST',
            data: 
            {
                login: login, 
                password: password,
                role_id,
                name: name,
                surname: surname,
                patronymic: patronymic,
                email: email,
                company: company,
                department: department,
                position: position,
                commentary: commentary
            },
        
            success: function(resp) {
                console.log(resp);
                if(resp.result == 1) {
                    //window.location.href = resp.msg;
                    //TODO: перезагрузить список
                }
                else {
                    //TODO: сообщение об ошибке
                    console.log(resp.msg);
                }
            }
        });

        $('#createModal').modal('hide');
    });

    //удаление
    $('#deleteModal').on('shown.bs.modal', function () {
        $('#delete_text').text('Действительно удалить пользователя ' + user_login_to_delete + '?');
    });

    $('#createModal').on('hidden.bs.modal', function () {
        user_login_to_delete = undefined;
        user_id_to_delete = undefined;
    });

    $('#delete_user_confirm').on('click', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/delete_user_ajax',
            type: 'POST',
            data: 
            {
                id: user_id_to_delete
            },
        
            success: function(resp) {
                console.log(resp);
                if(resp.result == 1) {
                    //window.location.href = resp.msg;
                    //TODO: перезагрузить список
                }
                else {
                    //TODO: сообщение об ошибке
                    console.log(resp.msg);
                }
            }
        });

        $('#deleteModal').modal('hide');
    });
});
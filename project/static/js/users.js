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
                    reload_user_list();
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
                if(resp.result == 1) {
                    reload_user_list();
                }
                else {
                    //TODO: сообщение об ошибке
                    console.log(resp.msg);
                }
            }
        });

        $('#deleteModal').modal('hide');
    });

    function reload_user_list() {
        $('#users_table_body').empty();

        $.ajax({
            url: '/get_users_ajax',
            type: 'POST',
            data: 
            {
            },
        
            success: function(resp) {
                resp.forEach((user) => {
                    $('#users_table_body').append('<tr role="row" class="">');
                    $('#users_table_body').append('<td aria-colindex="1" role="cell" class="">' + user.id + '</td>');
                    $('#users_table_body').append('<td aria-colindex="2" role="cell" class="">' + user.login + '</td>');
                    $('#users_table_body').append('<td aria-colindex="3" role="cell" class="">' + user.surname + '</td>');
                    $('#users_table_body').append('<td aria-colindex="4" role="cell" class="">' + user.name + '</td>');
                    $('#users_table_body').append('<td aria-colindex="5" role="cell" class="">' + user.patronymic + '</td>');
                    $('#users_table_body').append('<td aria-colindex="6" role="cell" class="">' + user.role_name + '</td>');

                    //кнопки
                    let buttons = '';
                    buttons += '<td aria-colindex="7" role="cell" class="">';
                    buttons += '<div role="group" class="btn-group">';
                    buttons += '<button title="Изменить пользовательские данные" type="button" data-user_id="' + user.id + '" class="btn btn-outline-warning btn-sm edit_user">';
                    buttons += '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
                    buttons += '</button>';
                    buttons += '<button title="Информация о пользователе" type="button" data-user_id="' + user.id + '" class="btn btn-outline-info btn-sm info_user">';
                    buttons += '<i class="fa fa-info-circle" aria-hidden="true"></i>';
                    buttons += '</button>';
                    if(user.role_id != 1) {
                        buttons += '<button title="Удалить пользователя" type="button" data-user_id="' + user.id + '" data-user_login="' + user.login + '" class="btn btn-outline-danger btn-sm delete_user">';
                        buttons += '<i class="fa fa-trash" aria-hidden="true"></i>';
                        buttons += '</button>';
                    }
                    buttons += '</div>';
                    buttons += '</td>';

                    $('#users_table_body').append(buttons);
                    $('#users_table_body').append('</tr>');

                    $('.delete_user').on('click', function(e){
                        e.preventDefault();
                
                        user_id_to_delete = $(this).data('user_id');
                        user_login_to_delete = $(this).data('user_login');
                
                        $('#deleteModal').modal('show');
                    });
                });
            }
        });
    }
});
$(function() {
    $('#create_user').on('click', function(e){
        e.preventDefault();

        $('#createModal').modal('show');
    });

    $('#edit_user').on('click', function(e){
        e.preventDefault();

        let user_id = $(this).data('user_id');

        alert(user_id);
    });

    $('#info_user').on('click', function(e){
        e.preventDefault();

        let user_id = $(this).data('user_id');

        alert(user_id);
    });

    $('#delete_user').on('click', function(e){
        e.preventDefault();

        let user_id = $(this).data('user_id');

        alert(user_id);
    });

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

        if(passwod == '') {
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
    });
});
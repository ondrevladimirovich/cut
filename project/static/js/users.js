$(function() {
    $('#create_user').on('click', function(e){
        e.preventDefault();
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
});
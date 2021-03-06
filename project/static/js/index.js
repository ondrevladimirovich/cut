$(function() {
    let devices_total_count;
    let current_page_number = 1;
    let page_size = 20;
      
      var map = L.map('map').setView([46.973, 41.445], 10);
      
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      var markers = L.markerClusterGroup();


    $.ajax({
        url: '/get_devices_for_map_ajax',
        type: 'POST',
        data: 
        {
        },
    
        success: function(resp) {
            if(resp.result == 1) {

                resp.devices.forEach((device) => {
                    if(device.latitude != '' && device.longitude !== '') {
                        let marker = L.marker([device.latitude, device.longitude]).bindPopup(device.address);
                        markers.addLayer(marker);
                    }
                });

                map.addLayer(markers);
            }
            else {
                //TODO: сообщение об ошибке
                console.log(resp.msg);
            }
        }
    });

    $('#refresh_data').on('click', function(e){
        e.preventDefault();

        /*console.log($('#pagination_first').data('page'));
        $('#pagination_first').data('page', 99);
        console.log($('#pagination_first').data('page'));*/
    });

    $('.page-item').on('click', function(e){
        e.preventDefault();

        //если кнопка неактивна - ничего не делать
        let is_disabled = $(this).hasClass('disabled');
        if(is_disabled)
            return;

        //если выбрана текущая страница - ничего не делать
        let is_current = $(this).hasClass('active');
        if(is_current)
            return;

        current_page_number = $(this).data('page');
        page_size = Number($('#devices_per_page').val());

        if(current_page_number != undefined) {
            fill_devices_table(current_page_number, page_size);
        }        
    });

    $('#devices_per_page').change(function() {
        new_page_size = Number($('#devices_per_page').val());

        if(new_page_size > page_size) {
            let last_page_number = Math.ceil(devices_total_count / new_page_size);
            $('#pagination_last').data('page', last_page_number);

            if(current_page_number > last_page_number) {
                current_page_number = last_page_number;

                $('#pagination_prev').data('page', current_page_number - 1);

                $('#pagination_one').data('page', current_page_number - 2);
                $('#pagination_one').children().html(current_page_number - 2)
                $('#pagination_two').data('page', current_page_number - 1);
                $('#pagination_two').children().html(current_page_number - 1)
                $('#pagination_three').data('page', current_page_number);
                $('#pagination_three').children().html(current_page_number);

                $('#pagination_one').removeClass('active');
                $('#pagination_two').removeClass('active');
                $('#pagination_three').addClass('active');

                $('#pagination_next').addClass('disabled');
                $('#pagination_last').addClass('disabled');
            }
        }

        fill_devices_table(current_page_number, new_page_size);
    });

    function fill_devices_table(page_number, page_size) {
        //забрать AJAX очередную страницу
        $.ajax({
            url: '/get_devices_ajax',
            type: 'POST',
            data: 
            {
                page_number: page_number, 
                page_size: page_size
            },
        
            success: function(resp) {
                console.log(resp);
                if(resp.result == 1) {
                    devices_total_count = resp.devices_total_count;
                    let last_page_number = Math.ceil(devices_total_count / page_size);

                    //очистить и нарисовать заново таблицу
                    $('#devices_table_body').empty();
                    
                    let devices = '';
                    resp.devices.forEach((device) => {
                        
                        devices += '<tr role="row">';

                        devices += '<td aria-colindex="1" role="cell">';
                        devices += '<i class="fa fa-phone-square" aria-hidden="true"></i>';
                        devices += device.phone_type;
                        devices += '</td>'
                        devices += '<td aria-colindex="2" role="cell">';
                        devices += device.month_availability;
                        devices += '</td>';
                        devices += '<td aria-colindex="3" role="cell">';
                        devices += device.id;
                        devices += '</td>';
                        devices += '<td aria-colindex="4" role="cell">';
                        devices += device.number;
                        devices += '</td>';
                        devices += '<td aria-colindex="5" role="cell">';
                        devices += device.line_type;
                        devices += '</td>';
                        devices += '<td aria-colindex="6" role="cell">';
                        devices += device.sw_version;
                        devices += '</td>';
                        devices += '<td aria-colindex="7" role="cell">';
                        devices += device.address;
                        devices += '</td>';
                        devices += '<td aria-colindex="8" role="cell">';
                        devices += device.last_call_date;
                        devices += '</td>';
                        devices += '<td aria-colindex="9" role="cell">';
                        devices += device.state;
                        devices += '</td>';

                        devices += '</tr>';
                    });

                    $('#devices_table_body').append(devices);

                    //перерисовать пагинацию
                    //3 случая:
                    if(page_number == 1) {
                        //1. 1ая страница
                        // - кнопки перехода назад заблокированы
                        $('#pagination_first').addClass('disabled');
                        $('#pagination_prev').addClass('disabled');

                        // - кнопки перехода вперёд - разблокированы
                        $('#pagination_next').removeClass('disabled');
                        $('#pagination_last').removeClass('disabled');


                        // - 1 - активная
                        $('#pagination_one').addClass('active');
                        $('#pagination_two').removeClass('active');
                        $('#pagination_three').removeClass('active');

                        // - цифры и дата-пейдж 1, 2, 3
                        $('#pagination_one').data('page', 1);
                        $('#pagination_one').children().html(1)
                        $('#pagination_two').data('page', 2);
                        $('#pagination_two').children().html(2)
                        $('#pagination_three').data('page', 3);
                        $('#pagination_three').children().html(3)

                        // - кнопка перехода вперёд: 2
                        $('#pagination_next').data('page', 2);

                        // - кнопка перехода в конец: последняя
                        $('#pagination_last').data('page', last_page_number);
                    } else if (page_number == last_page_number) {
                        //2. последняя страница

                        // - кнопки перехода вперёд заблокированы
                        $('#pagination_next').addClass('disabled');
                        $('#pagination_last').addClass('disabled');

                        // - кнопки перехода назад - разблокированы
                        $('#pagination_first').removeClass('disabled');
                        $('#pagination_prev').removeClass('disabled');

                        // - последняя - активная
                        $('#pagination_three').addClass('active');
                        $('#pagination_one').removeClass('active');
                        $('#pagination_two').removeClass('active');

                        // - цифры и дата-пейдж последняя - 2, последняя - 1, последняя
                        $('#pagination_one').data('page', last_page_number - 2);
                        $('#pagination_one').children().html(last_page_number - 2)
                        $('#pagination_two').data('page', last_page_number - 1);
                        $('#pagination_two').children().html(last_page_number - 1)
                        $('#pagination_three').data('page', last_page_number);
                        $('#pagination_three').children().html(last_page_number)

                        // - кнопка перехода назад: последняя - 1
                        $('#pagination_prev').data('page', last_page_number - 1);

                        // - кнопка перехода в начало: 1
                        $('#pagination_first').data('page', 1);
                    } else {
                        //3. все остальные
                        // - кнопки перехода в обе стороны разблокированы
                        $('#pagination_first').removeClass('disabled');
                        $('#pagination_prev').removeClass('disabled');
                        $('#pagination_next').removeClass('disabled');
                        $('#pagination_last').removeClass('disabled');

                        $('#pagination_two').addClass('active');
                        $('#pagination_one').removeClass('active');
                        $('#pagination_three').removeClass('active');

                        $('#pagination_one').data('page', page_number - 1);
                        $('#pagination_one').children().html(page_number - 1)
                        $('#pagination_two').data('page', page_number);
                        $('#pagination_two').children().html(page_number)
                        $('#pagination_three').data('page', page_number + 1);
                        $('#pagination_three').children().html(page_number + 1)

                        $('#pagination_first').data('page', 1);
                        $('#pagination_prev').data('page', page_number - 1);
                        $('#pagination_next').data('page', page_number + 1);
                        $('#pagination_last').data('page', last_page_number);
                    }
                }
                else {
                    //TODO: сообщение об ошибке
                    console.log(resp.msg);
                }
            }
        });
    };
});
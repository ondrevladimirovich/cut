$(function() {
    let devices_total_count;
    let current_page_number = 1;
    let page_size = 20;

    // The first parameter are the coordinates of the center of the map
    // The second parameter is the zoom level
    var map = L.map('map').setView([46.97361, 41.445], 10);
  
    // {s}, {z}, {x} and {y} are placeholders for map tiles
    // {x} and {y} are the x/y of where you are on the map
    // {z} is the zoom level
    // {s} is the subdomain of cartodb
    var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });
    
    // Now add the layer onto the map
    map.addLayer(layer);

    $.ajax({
        url: '/get_devices_for_map_ajax',
        type: 'POST',
        data: 
        {
        },
    
        success: function(resp) {
            if(resp.result == 1) {
                resp.devices.forEach((device) => {
                    if(device.latitude != '' && device.longitude !== '')
                        L.marker([device.latitude, device.longitude], {
                            html: device.address
                        }).addTo(map)
                        /*L.popup()
                        .setLatLng([device.latitude, device.longitude])
                        .setContent("I am a standalone popup.")
                        .openOn(mymap);*/
                });
            }
            else {
                //TODO: сообщение об ошибке
                console.log(resp.msg);
            }
        }
    });

    $('#refresh_data').on('click', function(e){
        e.preventDefault();

        alert(1);
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
        page_size = $('#devices_per_page').val();

        if(page != undefined) {
            fill_devices_table(current_page_number, page_size);
        }        
    });

    $('#devices_per_page').change(function() {
        page_size = $('#devices_per_page').val();

        fill_devices_table(current_page_number, page_size);
    });

    function fill_devices_table(page, page_size) {
        //забрать AJAX очередную страницу
        $.ajax({
            url: '/get_devices_ajax',
            type: 'POST',
            data: 
            {
                page_number: page, 
                page_size: page_size
            },
        
            success: function(resp) {
                console.log(resp);
                if(resp.result == 1) {
                    devices_total_count = resp.devices_total_count;

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

                }
                else {
                    //TODO: сообщение об ошибке
                    console.log(resp.msg);
                }
            }
        });
    };
});
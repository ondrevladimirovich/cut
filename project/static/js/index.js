$(function() {
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

        //если выбрана текущая страница - ничего не делать
        let is_current = $(this).hasClass('active');
        if(is_current)
            return;

        let page = $(this).data('page');

        if(page != undefined) {
            alert(page);

            //забрать AJAX очередную страницу
            //очистить и нарисовать заново таблицу
            //перерисовать пагинацию
        }        
    });
});
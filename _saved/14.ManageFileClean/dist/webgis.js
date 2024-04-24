// Full screen map view
var mapId = document.getElementById('map');
function fullScreenView(){
    mapId.requestFullscreen();
}

// script JQuery untuk map printing function
$('.print-map').click(function(){
    window.print();
})

// script untuk memanggil fungsi map print dari plugin browser print
L.control.browserPrint().addTo(map);

// script untuk mengaktifkan fungsi measure control
L.control.measure().addTo(map);

// customize measure control unit and language
L.Measure = {
linearMeasurement: "Distance measurement",
areaMeasurement: "Area measurement",
start: "Start",
meter: "m",
meterDecimals: 0,
kilometer: "km",
kilometerDecimals: 2,
squareMeter: "m²",
squareMeterDecimals: 0,
squareKilometers: "km²",
squareKilometersDecimals: 2
};

// geocoder load
$.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=47.217954&lon=-1.552918', function(data){
    console.log(data.address.road);
    });
    L.Control.geocoder().addTo(map);

// zoom to layer function
$('.zoom-to-layer').click(function(){
    map.setView([-6.802, 106.786], 13)
});


// zoom extent
var group = new L.featureGroup([marker, marker2]);
map.fitBounds(group.getBounds());
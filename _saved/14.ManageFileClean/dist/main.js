// map class initialize
// var map = L.map('map').setView([-6.1944, 106.8229], 19);
var map = L.map('map').setView([-6.802, 106.786], 13);

// zoom control position
map.zoomControl.setPosition('topright');

// adding osm tilelayer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', 
    minZoom:3 ,
    maxZoom:21
}).addTo(map);

// adding other map tile layer
var stadiaMapImagery = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'jpg'
});

var esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    minZoom:3,
    maxZoom:18
});


// adding marker in the center of the map
// L.marker([-6.1944, 106.8229]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();

// add map scale
L.control.scale().addTo(map);
// L.control.scale({position:'bottomright'}).addTo(map);



// Map Coordinate Display
map.on('mousemove',function(e){
    console.log(e)
    $('.coordinate').html(`Lat : ${e.latlng.lat} Lng : ${e.latlng.lng}`)
})



// Geojson load
// L.geoJSON(data).addTo(map);

// Geojson cluster load and popup CL Bocimi Toll Road
var marker = L.markerClusterGroup();
var clBocimi = L.geoJSON(bocimi, {
    onEachFeature: function (feature,layer) {
        // layer.bindPopup(feature.properties.namobj)
        // layer.bindPopup(feature.properties.name)
        layer.bindPopup('<h4>Link :</h4></h1><a href="https://ion.cesium.com/stories/viewer/?id=efdeba93-4f8a-4b64-8e36-9588a9f384da">3D Model</a>')
    }
});
clBocimi.addTo(marker);
marker.addTo(map);

// Geojson cluster load  with popup SPBU DK Jakarta
var marker2 = L.markerClusterGroup();
var vector = L.geoJSON(spbu_v2, {
    onEachFeature: function (feature,layer) {
        layer.bindPopup(feature.properties.namobj)
    }
});
vector.addTo(marker2);
marker2.addTo(map);



// leaflet layer control
var baseMaps = {
    'Open Street Maps': osm,
    'Stadia Map Imagery':stadiaMapImagery,
    'Esri World Imagery': esriWorldImagery
}
var overlayerMaps = {
    'Center Line Bocimi Toll Road': marker,
    'Titik SPBU DK Jakarta': marker2
}
L.control.layers(baseMaps, overlayerMaps).addTo(map);


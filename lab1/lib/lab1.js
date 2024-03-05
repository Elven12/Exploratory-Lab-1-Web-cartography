mapboxgl.accessToken = 'pk.eyJ1IjoiamwxMjgiLCJhIjoiY2xiNWxjZDMyMDNseDN2bnRuZmJnZmVpMyJ9.m9nMrt48uC0SHC_YOJtAjg';
const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [-123.25, 49.262], 
    zoom: 13.5 
});

var geojson;

function classify_log(st){
    if (st == 'cafe'){
        return 'cafe'
    }else if(st == 'restaurant'){
        return 'restaurant'
    }else if (st =='bank'){
        return 'bank'
    }
    else {
        return 'service'
    }
}
map.on('load', () => {
    map.addSource('places', {
        type: 'geojson',
        data: "https://raw.githubusercontent.com/UBCGeodata/ubc-geospatial-opendata/master/ubcv/locations/geojson/ubcv_poi.geojson"
    })
    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout' : {}
    })
});


$.getJSON("https://raw.githubusercontent.com/UBCGeodata/ubc-geospatial-opendata/master/ubcv/locations/geojson/ubcv_poi.geojson", function (data) {

    geojson = data;

    for (const feature of geojson.features) {
        const el = document.createElement('div');

        var service_type = feature.properties.SERVICE_TYPE;
  
        el.className = classify_log(service_type);
         
        new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                    .setHTML(
                        `<h3>${feature.properties.PLACENAME}</h3><p>${service_type}</p>`
                    )
            )
            .addTo(map);
    }
});
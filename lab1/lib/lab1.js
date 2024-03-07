mapboxgl.accessToken = 'pk.eyJ1IjoiamwxMjgiLCJhIjoiY2xiNWxjZDMyMDNseDN2bnRuZmJnZmVpMyJ9.m9nMrt48uC0SHC_YOJtAjg';
const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-123.25, 49.262], 
    zoom: 14.5,
    minzoom: 10,
    pitch: 60
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
    else if (st == 'park'){
        return 'park';
    }
    else if (st == 'campus_services'){
        return 'service'
    }
}


function toggleSidebar (id){
    const elem = document.getElementById(id);
    const collapsed = elem.classList.toggle('collapsed')

    const padding = {}
    padding[id] = collapsed ? 0:300;
    map.easeTo({
        padding: padding,
        duration: 1000
    });
}

function add_map(e, feature){
    var service_type = feature.properties.SERVICE_TYPE;
    e.className = classify_log(service_type);
    new mapboxgl.Marker(e)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${feature.properties.PLACENAME}</h3><p>${service_type}</p>`
            )
    ).addTo(map);
}

$.getJSON("https://raw.githubusercontent.com/UBCGeodata/ubc-geospatial-opendata/master/ubcv/locations/geojson/ubcv_poi.geojson", function (data) {

    geojson = data;

     geojson.features.forEach(function(feature){
        const el = document.createElement('div');
        add_map(el,feature)

        geojson.features.forEach(function (feature, i) {
            feature.properties.id = i;
        });
    });

    map.on('load', () => {
        toggleSidebar('left');
    });
});
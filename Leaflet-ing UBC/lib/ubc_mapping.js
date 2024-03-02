var map = L.map('mapid', {
    center: [49.265637, -123.256113],
    zoom: 15
});
var topoTiles = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {   maxZoom: 17,
        attribution: 
        'Basemap data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
).addTo(map);


var roadGeoJson;
var roadsToHighlight = "";

function style (feature) {
    return {
        color : 'blue',
        weight: 2,
        opacity: 1,
    }
}

function roadsToFilter(feature){
    if (roadsToHighlight == ""){
        return true;
    } else if (feature.properties &&feature.properties.RD_CLASS ){
        return feature.properties.RD_CLASS.toLowerCase().includes(roadsToHighlight.toLowerCase());
    } else {
        return false;
    }
    
}
var lastLayerAdded = {};
function addRoads() {
    if (map.hasLayer(lastLayerAdded)){
        map.removeLayer(lastLayerAdded);
    }
    lastLayerAdded = L.geoJSON(roadGeoJson, 
        {style : style,
        filter: roadsToFilter
    });
    lastLayerAdded.addTo(map);
  };


  function highlightRoads() {
    roadsToHighlight = document
      .getElementById("road_types")
      .value;
    addRoads();
    roadsToHighlight = ""; // reset so that "Show All Trees" works.
  }

$.getJSON("https://raw.githubusercontent.com/UBCGeodata/ubc-geospatial-opendata/master/ubcv/transportation/geojson/ubcv_roads_simple.geojson",
    function (data){
        roadGeoJson = data;
        document.getElementById("showRoad")
        .addEventListener('click', addRoads);

        document.getElementById("roadHighlightButton")
        .addEventListener('click',highlightRoads)
    });

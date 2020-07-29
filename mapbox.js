//-----------MAPBOX API---------------//


mapboxgl.accessToken = 'pk.eyJ1IjoibGV2aW9zYWgiLCJhIjoiY2tjem9leW56MDRxYzJycTk1ZGk0OTR4bCJ9.rS29O6Tqd_ERfMhITzvNxg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-122.3321, 47.6062],
  zoom: 10.5
});

function storeCoordinate(xVal, yVal, name, array) {
  array.push({x: xVal, y: yVal, n: name});
}


//var coords = [{"x":-122.387082,"y":47.563483,"n":"Seattle Fish Company"},{"x":-122.3866,"y":47.563,"n":"Shadowland"},{"x":-122.410356,"y":47.579434,"n":"Alki Beach"}];




for (var i = 0; i < coords.length; i++) {
  var x = coords[i].x;
  var y = coords[i].y;
  var n = coords[i].n;


console.log("coords: " + JSON.stringify(coords));




var geojson = {

    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [coords[i].x, coords[i].y] 
      },
      properties: {
        description: coords[i].n
      }
    },
  ]
  };

geojson.features.forEach(function(marker) {

// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<p>' + marker.properties.description + '</p>'))
  .addTo(map);
});

}

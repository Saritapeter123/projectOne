mapboxgl.accessToken = 'pk.eyJ1IjoibGV2aW9zYWgiLCJhIjoiY2tjem9leW56MDRxYzJycTk1ZGk0OTR4bCJ9.rS29O6Tqd_ERfMhITzvNxg';
getPosition();
            
function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successPosition);
  }
  else alert("Your browser does not support your location") 
  }

function successPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var currentLoc = [lon, lat]

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/leviosah/ckdaqs7ia0al71iplx3ztkl5g',
    center: [lon, lat],
    zoom: 10.5
  });

  $("#submit").on("click", function(coords) {

  var coords = JSON.parse(localStorage.getItem('coords'));
  console.log("This is the coords " + JSON.stringify(coords));
 
  
  var geojson = {
  
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [coords.x, coords.y] 
        },
        properties: {
          description: coords.n
        }
      },
    ]
    };

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/leviosah/ckdaqs7ia0al71iplx3ztkl5g',
    center: [coords.x, coords.y],
    zoom: 14})

  console.log("geoJson " + JSON.stringify(geojson))
  
  geojson.features.forEach(function(marker) {
  
  var el = document.createElement('div');
  el.className = 'marker';
  
 new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<p>' + marker.properties.description + '</p>'))
    .addTo(map);
  });
  
  
});


}


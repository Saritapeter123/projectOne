//-----------MAPBOX API---------------//


mapboxgl.accessToken = 'pk.eyJ1IjoibGV2aW9zYWgiLCJhIjoiY2tjem9leW56MDRxYzJycTk1ZGk0OTR4bCJ9.rS29O6Tqd_ERfMhITzvNxg';
let coords = [];


getPosition();


function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successPosition);
  }
  else
    alert("Your browser does not support your location")
}

function successPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  var currentLoc = [lon, lat]
  console.log("this is current loc " + currentLoc)

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [lon, lat],
    zoom: 10.5
  });


  coords = [{"x":-127.387082,"y":38.563483,"n":"Seattle Fish Company"},{"x":-122.378116,"y":47.648114,"n":"Redmill Burgers"},{"x":-122.312689,"y":47.621590,"n":"Smith"}];
  var bbox2 = [];
  console.log("this is the array for x " + bboxX)
  console.log("this is the max " + Math.max(bboxX))

  var maxX = -1000
  var maxY = 0
  var minX = 0
  var minY = 1000

    for (var i = 0; i < coords.length; i++) {
      if (coords[i].x > maxX) {
        maxX = coords[i].x
      }
      if (coords[i].y > maxY) {
        maxY = coords[i].y
      }
      if (coords[i].x < minX) {
        minX = coords[i].x
      }
      if (coords[i].y < minY) {
        minY = coords[i].y
      }
      
    }
  

  // for (var i = 0; i < coords.length; i++) {
  //   bboxX = bboxX.concat(coords[i].x);
  //   bboxY = bboxY.concat(coords[i].y);
  //   bbox2 = bbox2.concat([coords[i].x, coords[i].y]);
  // }

  // var maxX = Math.max(bboxX)
  // var maxY = Math.max(bboxY)
  // var minX = Math.min(bboxX)
  // var minY = Math.min(bboxY)
  console.log("maxX " + maxX)
  console.log("maxY " + maxY)
  console.log("minY " + minY)
  console.log("minX " + minX)

  console.log("bbox2 " + bbox2)
  //bbox2.forEach(maxMinFunc);

  //function maxMinFunc(value) {
   // var MinCoord = Math.max(value)
   // var MinCoord
  //}

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
  var bbox = [[maxX, maxY],[minX, minY]]
  map.fitBounds(bbox, {
    padding: {top: 20, bottom:50, left: 30, right: 10}
  });
}


//function storeCoordinate(xVal, yVal, name, array) {
 // array.push({x: xVal, y: yVal, n: name});
//}


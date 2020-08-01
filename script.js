$(document).ready(function () {
  // gets the current value selected by user in dropdown
  let cuisine = $("#ddcuisine").val();
  let dollarsignVal = $("#ddprice").val();
  let radiusVal = $("#ddradius").val();
  let lon = [];
  let lat = [];
  // fetch and return coordinates
  getPosition();

  // prompt user for current location. if success, get coordinates. if no, tell user "your browser does not support your location (subject to change)"
  // **possible feature: add something to prevent user from proceeding if there is no successPosition
  function getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successPosition);
    }
    else alert("Your browser does not support your location")
  }

  // store the latitude and longitude in variables
  function successPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    var currentLoc = [lon, lat]

    // takes local variable so I can use it globally
    // **might be an issue later on down the line going with this method
    function add(paraLatLon) {
      paraLatLon = currentLoc;
      latlonVal = paraLatLon;
    }

    // actual part that adds value from local variable and add it to a global variable
    add(latlonVal);
    //console.log("this is current loc " + currentLoc)
    //console.log(latlonVal[0]);
    //console.log(latlonVal[1]);
  };

  // *said global variable
  var latlonVal;
  //console.log(latlonVal);
  mapboxgl.accessToken = 'pk.eyJ1IjoibGV2aW9zYWgiLCJhIjoiY2tjem9leW56MDRxYzJycTk1ZGk0OTR4bCJ9.rS29O6Tqd_ERfMhITzvNxg';


  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [lon, lat],
    zoom: 10.5
  });
  // listen for click from submit button
  $("#submit").on("click", function () {

    $("#chosenRest").show();
    $("#restName").show();
    $("#bizAddress").show();
    $("#mapContainer").show();

    // user selections that store their values into a param for later use
    cuisine = $("#ddcuisine").val();
    dollarSignVal = $("#ddprice").val();
    radiusVal = $("#ddradius").val();

    // full url to call api
    const queryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?" + "latitude=" + latlonVal[1] + "&longitude=" + latlonVal[0] + "&categories=" + cuisine + "&price=" + dollarSignVal + "&radius=" + radiusVal;
    //console.log(queryUrl);

    // ajax calling the url + api key + user input params
    $.ajax({
      url: queryUrl,
      headers: {
        'Authorization': 'Bearer 2A_26XM2MNsqPRYFIkuDPx-YUSHRSfNuOmu_lc18NrHepjcxUtyQ_UKHNXWiYwTNos-d0tdf9rvLeqc2MbzhqWTegYFcZGCNnybE1ntyDLxOx22UGjo65k5HIV0aX3Yx',
      },
      method: 'GET',
      dataType: 'json',
      success: function (data) {

        // grab the results from the API JSON return
        let totalresults = data.businesses.length;
        console.log(data);

        // randomizes pool of results and sets it into a var named 'index'
        var index = Math.floor(Math.random() * totalresults)

        // takes the one random business and sets into a var named 'randoBiz'
        var randoBiz = data.businesses[index]
        //console.log(randoBiz);

        console.log("randoBiz " + JSON.stringify(randoBiz))
        // correct syntax for Mapbox API
        var mapBoxCoords = {
          x: randoBiz.coordinates.longitude,
          y: randoBiz.coordinates.latitude,
          n: randoBiz.name
        }

        console.log("mapBoxCoords " + JSON.stringify(mapBoxCoords))
        //console.log(mapBoxCoords);

        // set var with coordinates in local storage so that Mapbox can use it later
        localStorage.setItem("coords", JSON.stringify(mapBoxCoords));

        // variables that are to be appended into appropriate divs in HTML
        var name = randoBiz.name;
        var address = randoBiz.location.display_address;
        var phone = randoBiz.display_phone;
        var image = randoBiz.image_url;
        //console.log(name);
        //console.log(address);
        //console.log(phone);
        //console.log(image);

        // *said appending function                                     
        $('#chosenRest .picture').attr("src", randoBiz.image_url);
        $('#restName .title').text(randoBiz.name);
        $('#restName .subtitle').text(randoBiz.display_phone);
        $('#bizAddress .text').text(randoBiz.location.display_address);

      },
      complete: function (coords) {

        var coords = JSON.parse(localStorage.getItem('coords'));

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

        map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v10',
          center: [coords.x, coords.y],
          zoom: 14
        })

        geojson.features.forEach(function (marker) {

          var el = document.createElement('div');
          el.className = 'marker';

          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML('<p>' + marker.properties.description + '</p>'))
            .addTo(map);
        });
      }

    });

  });
});
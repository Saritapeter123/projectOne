
// gets the current value selected by user in dropdown
let cuisine = $("#ddcuisine").val();
let dollarsignVal = $("#ddprice").val();
let radiusVal = $("#ddradius").val();
            
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
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var currentLoc = [lon, lat]

// takes local variable so I can use it globally
// **might be an issue later on down the line going with this method
function add(paraLatLon){
  paraLatLon = currentLoc;
  latlonVal = paraLatLon;
}

// actual part that adds value from local variable and add it to a global variable
add(latlonVal);
console.log("this is current loc " + currentLoc)
console.log(latlonVal);
console.log(latlonVal[0]);
console.log(latlonVal[1]);
};

//said global variable
var latlonVal;

//listen for click from submit button
$("#submit").on("click", function() {

  //user selections that store their values into a param for later use
  cuisine = $("#ddcuisine").val();
  dollarSignVal = $("#ddprice").val();
  radiusVal = $("#ddradius").val();

  // full url to call api
  const queryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?" + "latitude=" + latlonVal[1] + "&longitude=" + latlonVal[0] +  "&categories=" + cuisine + "&price=" + dollarSignVal + "&radius=" + radiusVal;
  console.log(queryUrl);
            
  // ajax calling the url + api key + user input params
  $.ajax({
    url: queryUrl,
    headers: {
      'Authorization':'Bearer 2A_26XM2MNsqPRYFIkuDPx-YUSHRSfNuOmu_lc18NrHepjcxUtyQ_UKHNXWiYwTNos-d0tdf9rvLeqc2MbzhqWTegYFcZGCNnybE1ntyDLxOx22UGjo65k5HIV0aX3Yx',
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){

    // Grab the results from the API JSON return
    let totalresults = data.businesses.length;
    console.log(data);

    var index = Math.floor(Math.random()*totalresults)
    var randoBiz = data.businesses[index]
    console.log(randoBiz);
    var mapBoxCoords = {
        x: randoBiz.coordinates.latitude,
        y: randoBiz.coordinates.longitude,
        n: randoBiz.name                                   
    }
    console.log(mapBoxCoords);
                                // Itirate through the JSON array of 'businesses' which was returned by the API
                            //     $.each(data.businesses, function(i, item) {
                            //         // Store each business's object in a variable
    var id = randoBiz.id;
    var alias = randoBiz.alias;
    var phone = randoBiz.display_phone;
    var image = randoBiz.image_url;

    console.log(id);
    console.log(alias);
    console.log(image);
    var name = randoBiz.name;
    var rating = randoBiz.rating;
    var reviewcount = randoBiz.review_count;
    var address = randoBiz.location.address1;
    var city = randoBiz.location.city;
    var state = randoBiz.location.state;
    var zipcode = randoBiz.location.zip_code;
    var latitude = randoBiz.coordinates.latitude;
    var longitude = randoBiz.coordinates.longitude;
                                //         console.log(`latitude: ${item.coordinates.latitude}`);
                                //         console.log(`longitude: ${longitude}`);
                                //         console.log(`alias: ${alias}`);
                                         //var resultsArray = [alias, latitude, longitude];
                                         //console.log(`resultsArray: ${resultsArray}`);
                                //         // Append our result into our page
                                         
        $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: '  + '<br>This business has a rating of ' + rating + latitude + ' with ' + ' reviews.</div>');
                                   
                                
        }
      });      
    });
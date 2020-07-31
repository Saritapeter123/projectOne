            //  function getSelectValue ()
            //  {
            //    var selectedValue = = document.getElementById("ddcuisine").value;
            //    console.log(selectedValue)
            //  }
            

            //  Where we append the URL with the options the user has selected from dropdowns.
            //  var url = new URL('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=seattle');
            //  var search_params = url.searchParams;
            //  var cuisineSelect = "greek" ;
            
            //  ("insert key", "insert value").
            //  search_params.append('categories', 'searchFunction' );
            //  search_params.append('radius', '16000');
            //  search_params.append('price', '1');
            //  search_params.append('categories', cuisineSelect);
            //  console.log(cuisineSelect);
             
             
            //  url.search = search_params.toString();

            //  var new_url = url.toString();
            
            //  what is should output : https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=seattle&id=101&categories=chinese
            //  console.log(new_url);

            // store the value of the input
let cuisine = $("#ddcuisine").val();
let dollarsignVal = $("#ddprice").val();
let radiusVal = $("#ddradius").val();



// $("#ddcuisine").keypress(function(event) { 
	
// 	if (event.keyCode === 13) { 
// 		event.preventDefault();
// 		$("#submit").click(); 
// 	} 
// });

// $("#ddprice").keypress(function(event) { 
	
// 	if (event.keyCode === 13) { 
// 		event.preventDefault();
// 		$("#submit").click(); 
// 	} 
// });

// ("#ddradius").keypress(function(event) { 
	
// 	if (event.keyCode === 13) { 
// 		event.preventDefault();
// 		$("#submit").click(); 
// 	} 
// });

$("#submit").on("click", function() {

  //$('#forecastH5').addClass('show');

  // get the value of the input from user
  cuisine = $("#ddcuisine").val();
  dollarSignVal = $("#ddprice").val();
  radiusVal = $("#ddradius").val();
  
  // clear input box
  //$("#searchTerm").val("");  

  // full url to call api
  const queryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=seattle" + "&categories=" + cuisine + "&price=" + dollarSignVal + "&limit=" + 6;// + "&radius=" + radiusVal;
  console.log(queryUrl);

             $.ajax({
                url: queryUrl,
                headers: {
                 'Authorization':'Bearer 2A_26XM2MNsqPRYFIkuDPx-YUSHRSfNuOmu_lc18NrHepjcxUtyQ_UKHNXWiYwTNos-d0tdf9rvLeqc2MbzhqWTegYFcZGCNnybE1ntyDLxOx22UGjo65k5HIV0aX3Yx',
                },
                method: 'GET',
                dataType: 'json',
                success: function(data){
                    // Grab the results from the API JSON return
                    let totalresults = data.total;
                    
                    // If our results are greater than 0, continue
                    if (totalresults > 0){
                        // Display a header on the page with the number of results
                        $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
                      

                        // Itirate through the JSON array of 'businesses' which was returned by the API
                        $.each(data.businesses, function(i, item) {
                            // Store each business's object in a variable
                            var id = item.id;
                            var alias = item.alias;
                            var phone = item.display_phone;
                            var image = item.image_url;
                            var name = item.name;
                            var rating = item.rating;
                            var reviewcount = item.review_count;
                            var address = item.location.address1;
                            var city = item.location.city;
                            var state = item.location.state;
                            var zipcode = item.location.zip_code;
                            var latitude = item.coordinates.latitude;
                            var longitude = item.coordinates.longitude;
                            console.log(`latitude: ${item.coordinates.latitude}`);
                            console.log(`longitude: ${longitude}`);
                            console.log(`alias: ${alias}`);
                            var resultsArray = [alias, latitude, longitude];
                            console.log(`resultsArray: ${resultsArray}`);
                            // Append our result into our page
                            $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + latitude + ' with ' + ' reviews.</div>');
                      });
                    } else {
                        // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                        $('results').append('<h5>We discovered no results!</h5>');
                      
                    }
                }
             });      
            });
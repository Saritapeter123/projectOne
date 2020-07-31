
            // store the value of the input
            let cuisine = $("#ddcuisine").val();
            let dollarsignVal = $("#ddprice").val();
            let radiusVal = $("#ddradius").val();
            
            
            

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
                
                function add(paraLatLon){
                  paraLatLon = currentLoc;
                  latlonVal = paraLatLon;
                }
                
                add(latlonVal);
                console.log("this is current loc " + currentLoc)
                console.log(latlonVal);
                console.log(latlonVal[0]);
                console.log(latlonVal[1]);
              };

              var latlonVal;
      
              
        
            $("#submit").on("click", function() {
            
              cuisine = $("#ddcuisine").val();
              dollarSignVal = $("#ddprice").val();
              radiusVal = $("#ddradius").val();
            
              // full url to call api
              const queryUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?" + "latitude=" + latlonVal[1] + "&longitude=" + latlonVal[0] +  "&categories=" + cuisine + "&price=" + dollarSignVal + "&limit=" + 6;// + "&radius=" + radiusVal;
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
                                let totalresults = data.businesses.length;
                                console.log(data);
                                // If our results are greater than 0, continue
                                if (totalresults > 0){
                                    // Display a header on the page with the number of results
                                    $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
                                  
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
                                //         var phone = item.display_phone;
                                         var image = randoBiz.image_url;

                                         console.log(id);
                                         console.log(alias);
                                         console.log(image);
                                //         var name = item.name;
                                //         var rating = item.rating;
                                //         var reviewcount = item.review_count;
                                //         var address = item.location.address1;
                                //         var city = item.location.city;
                                //         var state = item.location.state;
                                //         var zipcode = item.location.zip_code;
                                //         var latitude = item.coordinates.latitude;
                                //         var longitude = item.coordinates.longitude;
                                //         console.log(`latitude: ${item.coordinates.latitude}`);
                                //         console.log(`longitude: ${longitude}`);
                                //         console.log(`alias: ${alias}`);
                                         //var resultsArray = [alias, latitude, longitude];
                                         //console.log(`resultsArray: ${resultsArray}`);
                                //         // Append our result into our page
                                         //$('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + latitude + ' with ' + ' reviews.</div>');
                                         //$('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + latitude + ' with ' + ' reviews.</div>');
                                //   });
                                }
                            }
                         });      
                        });
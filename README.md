# Project One: Nom' Stop. A Food App For The Picky Millennial. 

We are the Wizards of Git and we wanted to create an app to simplify the life of people. Who hasn't been in the situation where you need to get dinner but you don’t know where to go? When you've tried all the restaurants in your neighborhood and end up ordering from the same place over and over again. That's why we created “Nom’Stop”, the app that chooses for you and makes picking dinner easy!

## Deployment

* Link to App: https://saritapeter123.github.io/projectOne/index.html
* Link to Repo: https://github.com/Saritapeter123/projectOne

## Demo Photo & Gif
Photo of Homepage with Prompt: 

![Screen Shot 2020-07-31 at 11 11 33 PM](https://user-images.githubusercontent.com/66030740/89096525-205bf100-d38c-11ea-8762-11ebb23dd461.png)

Photo of Results 1: 

![Screen Shot 2020-07-31 at 11 13 09 PM](https://user-images.githubusercontent.com/66030740/89096528-20f48780-d38c-11ea-87d7-e4eef4d98e99.png)

Photo of Results 2: 

![Screen Shot 2020-07-31 at 11 13 17 PM](https://user-images.githubusercontent.com/66030740/89096529-2225b480-d38c-11ea-8c36-830f2828a35e.png)

Gif: 

![Demo of App](https://github.com/Saritapeter123/projectOne/blob/master/Photos%20%26%20Gif/ezgif.com-video-to-gif.gif)

## User Story

As an indecisive individual who loves trying out new foods, I want an app that will choose a restaurant for me so that I don’t have to decide. Being surrounded by a variety of options doesn’t make choosing one easy. Our motivation was to alleviate the frustration especially for couples and small groups when it comes to deciding where to eat.

## Features

The goal in mind when building the app was simplistic responsiveness. We wanted an app that was easy to use, yet was dynamic enough to conform to use anywhere.
Simply input what type of cuisine you want to eat, how much you want to pay, and your location and the app will populate a randomized result. 

###### Current Features

* Filter Selectors based on Cuisine, Price Range and Radius which is dependent on user location.
* A randomizer to take a pool of results, pick one and present it to the user.
* A Map to display the location of the resulting restaurant

###### Future Implementations

* Return multiple restaurants to user
* Local Deals
* Randomizer for filters if the user is feeling adventurous.
* Sign up feature so that the user has the ability to create an account
* Voting feature 
* Dating app integration

## Technologies Used

* Bulma.IO for CSS framework
* Javascript
* JQuery
* HTML 5
* CSS 3
* Yelp Fusion API: To return business details
* Mapbox API: To display business that was returned from randomizer
* Google Font API
* MapboxGL Libraries
* Leaflet Libraries

## Challenges & Successes Encountered
Some of the challenges we encountered were utilizing a new CSS framework which was challenging because it was in a syntax that we were not used to. Learn how to utilize the APIs we picked was a challenge because we first had to figure out how to call them and how to navigate the various endpoints that each API had. Also, combining the two APIs were a challenge on their own because finding the proper way of storing and pulling the data between the two APIs involved concepts and ideas that we were not quite used to. Some of the successes were things like the randomizer feature, which basically involved parsing the return data from the Yelp API into an array and then into a Math.random function, which then spits out the randomized resturant. 

## Tasks and Roles

Conor Maguire: Mapbox API and integration/troubleshooting with the Yelp API
Jessica Feng: Front-End development & presentation creation
Daniel Balderas: Front-End development & presentation creation
Sarita Peter: Front-End development & presentation creation
Michael Chang: Yelp Fusion API and assisted Conor in integrating/troubleshooting with the Yelp API













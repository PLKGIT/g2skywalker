/* JavaScript/jQuery for Project #1 */

$(document).ready(function () {

    // Initialize Firebase

    var firebaseConfig = {
        apiKey: "AIzaSyB9khk4lQ0jXPOoqgHRbc8kGs8FRBLCU0c",
        authDomain: "datenightplanner-db265.firebaseapp.com",
        databaseURL: "https://datenightplanner-db265.firebaseio.com",
        projectId: "datenightplanner-db265",
        storageBucket: "datenightplanner-db265.appspot.com",
        messagingSenderId: "363079175780",
        appId: "1:363079175780:web:8fbd5e9219a9e1b9019971"
    };

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();


    // Global Variables
    //-------------------------------------------
    //-------------------------------------------
    //-------------------------------------------

    // User Input Variables
    //-------------------------------------------
    var userName;
    var userDate=moment().format('L');
    var userPlace; // 01182020 - Zipcode only right now
    var placeSource;
    var needRestaurant;
    var needDessert;
    var needMovies;
    var needAttractions;

    // Error Checking Variables

    var errName = false;
    var errDate = false;
    var errSource = false;
    var errPlace = false;
    var errOptions = false;
    var containsText = /\D/g;
    var containsNumbers = /\d/g;
    var zip_code = false;


    // Calculated from User Input
    //-------------------------------------------
    var dateDay;
    var dateMonth;
    var dateYear;
    var longitude;
    var latitude;

    // Date Help Variables
    //-------------------------------------------
    var helpMovies;
    var helpBooks;
    var helpQuotes;
    var helpJokes;

    // Results Variables or Pull from Database
    //-------------------------------------------
    var resultsWeather;
    var resultsRestaurants;
    var resultsDessertSpots;
    var resultsMovies;
    var resultsAttractions;

    // Application Logic
    //-------------------------------------------
    //-------------------------------------------
    //-------------------------------------------

    // Page Load
    //-------------------------------------------
    //-------------------------------------------

    //Show User Input Form on initial page load
    $("#userInput").show();

    // Hide User Results and Help on initial page load
    $("#userResults").hide();
    $("#userHelp").hide();

    // On Submit
    //-------------------------------------------
    //-------------------------------------------
    // Tested and Signed Off - __/__/____ PLK
    // --------------IN PROGRESS (Pam) ------------------   


    // Store user input from FORM
    $("#submit").on("click", function (event) {
        // Prevents form action default 
        event.preventDefault();

        // Clear any error messages
        $("#invalid_name").text("");
        $("#invalid_date").text("");
        $("#invalid_source").text("");
        $("#invalid_place").text("");

        // Form Validation

        // Set userName = Form userName
        // Test if null or equals 0, set or clear error message, and set error counter

        userName = $("#userName").val();
        // console.log("--Contents of User Name--");
        // console.log(userName);

        if (userName === "" || userName === "0" || containsNumbers.test(userName)) {
            $("#invalid_name").html("Please enter your first name.");
            errName = true;
        } else {
            $("#invalid_name").html("");
            errName = false;
        }

        // console.log("---First Name and Error Status---");
        // console.log(userName);
        // console.log(errName);

        // Set userDate = Form userDate
        // Date is controlled by the calendar, no user input is allowed

        userDate = $("#userDate").val();

        // if (userDate === "" || userDate.length < 8 || containsText.test(userDate)) {
        if (userDate === "") {
            $("#invalid_date").html("Enter a valid date.");
            errDate = true;
        } else {
            $("#invalid_date").html("");
            errDate = false;
            dateMonth = userDate.substr(0, 2);
            dateDay = userDate.substr(2, 2);
            dateYear = userDate.substr(4, 4);
        }

        // console.log("---Selected Date and Error Status---");
        // console.log(userDate);
        // console.log(errDate);
        // console.log("---Selected Month---");
        // console.log(dateMonth);
        // console.log("---Selected Day---");
        // console.log(dateDay);
        // console.log("---Selected Year---");
        // console.log(dateYear);

        // Set placeSource = Form source
        // Test if null

        placeSource = $("#source").val();

        if (placeSource === "") {
            $("#invalid_source").html("Select a source.");
            errSource = true;
        } else {
            $("#invalid_source").html("");
            errSource = false;
        }

        // Set userPlace = Form userPlace
        // Test if null

        userPlace = $("#userPlace").val();

        if (userPlace === "") {
            $("#invalid_place").html("Enter a location.");
            errPlace = true;
        } else {
            $("#invalid_place").html("");
            errPlace = false;
        }

        // Get longitude and latitude

        var convAPIkey = "c833b0a3e4104de495176d7252219568";
        var convQueryURL = "https://api.opencagedata.com/geocode/v1/json?countrycode=us&q=" + userPlace + "&key=" + convAPIkey + "&language=en&pretty=1"

        $.ajax({
            type: "GET",
            url: convQueryURL,
            datatype: "json",
            async: false,
            success: function(response){
                latitude = response.results[0].geometry.lat;
                longitude = response.results[0].geometry.lng;
                console.log("Internal to Function: " + latitude + " , " + longitude);                
            }
        });

        console.log("External to Function: " + latitude + " , " + longitude);

        // function myCallback(response) {
        //     latitude = response.results[0].geometry.lat;
        //     longitude = response.results[0].geometry.lng;
        //     console.log("Inside ajax: " + latitude);
        //     // Do whatever you need with result variable

        // }
        // $.ajax({
        //     type: "GET",
        //     url: convQueryURL,
        //     datatype: "json",
        //     success: myCallback,
        // });



        // $.ajax({
        //     url: convQueryURL,
        //     method: "GET",
        //     async: false,
        // })
        //     success: (function (response) {
        //         latitude = response.results[0].geometry.lat;
        //         longitude = response.results[0].geometry.lng;
        //         console.log(latitude);
        //         console.log(longitude);
        //         return latitude; 
        //         return longitude; 
        //     });

        // console.log(latitude);
        // console.log(longitude);

        // Test for Valid Zip Code

        if (placeSource === "zip") {

            if (userPlace === "" || userPlace.length < 5 || userPlace.length > 5 || containsText.test(userPlace)) {
                $("#invalid_place").html("Enter a zip code.");
                errPlace = true;
            } else {
                $("#invalid_place").html("");
                zip_code = true;
                errPlace = false;
            };
        }

        // console.log("---Date Location and Error Status---");
        // console.log(userPlace);
        // console.log(errPlace);

        // Test for Valid City and State
        //-------- In Progress --------

        if (placeSource === "city") {

            if (userPlace === "" || userPlace.indexOf(",") < 0 || containsNumbers.test(userPlace)) {
                $("#invalid_place").html("Enter a city and state.");
                errPlace = true;
            } else {
                $("#invalid_place").html("");
                errPlace = false;
            };
        }

        // console.log("---Date Location and Error Status---");
        // console.log(userPlace);
        // console.log(errPlace);


        // Test for Valid Longitude and Latitude (from Map)
        //-------- In Progress --------

        if (placeSource === "map") {

            if (userPlace === "" || placeSource === "map" && userPlace === "" || (userPlace.indexOf(",") < 0)) {
                $("#invalid_place").html("Select a place from the map.");
                errPlace = true;
            } else {
                $("#invalid_place").html("");
                errPlace = false;
            };
        }

        // console.log("---Date Location and Error Status---");
        // console.log(userPlace);
        // console.log(errPlace);

        // Setting value of variable based on whether checkbox is checked
        if (document.getElementById("needRestaurant").checked === true) {
            needRestaurant = true;
        } else {
            needRestaurant = false;
        }

        // Setting value of variable based on whether checkbox is checked
        if (document.getElementById("needDessert").checked === true) {
            needDessert = true;
        } else {
            needDessert = false;
        }

        // Setting value of variable based on whether checkbox is checked
        if (document.getElementById("needMovies").checked === true) {
            needMovies = true;
        } else {
            needMovies = false;
        }

        // Setting value of variable based on whether checkbox is checked
        if (document.getElementById("needAttractions").checked === true) {
            needAttractions = true;
        } else {
            needAttractions = false;
        }

        // Check that at least one box is checked
        if (needRestaurant === false && needDessert === false && needMovies === false && needAttractions === false) {
            errOptions = true;
            $("#invalid_options").html("Please select at least one option.");
        } else {
            $("#invalid_options").html("");
            errOptions = false;
        }

        // console.log("---Need Restaurant---");
        // console.log(needRestaurant);
        // console.log("---Need Dessert---");
        // console.log(needDessert);
        // console.log("---Need Movies---");
        // console.log(needMovies);
        // console.log("---Need Attractions---");
        // console.log(needAttractions);
        // console.log("---At least 1 box checked---");
        // console.log(errOptions);


        // Hide User Results and Help on initial page load
        $("#userResults").show();
        $("#userHelp").show();

        // Call Weather Functions 

        sunset();
        weather();
        forecast();

        // Will update movies in UI
        updateMovies(needMovies);
        // dessertShops(needDessert);
        // restaurant();
        dessertShops(needDessert);
        restaurantUpdate(needRestaurant);

    });

    // latitude and longitude for Restaurant call..
    // function restaurant() {
    //     var convAPIkey = "c833b0a3e4104de495176d7252219568";
    //     var convQueryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + userPlace + "&key=" + convAPIkey + "&language=en&pretty=1"

    //     $.ajax({
    //         url: convQueryURL,
    //         method: "GET"
    //     })
    //         .then(function (response) {
    //             latitude = response.results[0].geometry.lat;
    //             longitude = response.results[0].geometry.lng;
    //             // console.log("-----testdirection----");
    //             // console.log(latitude);
    //             // console.log(longitude);

    //             restaurantHelper(latitude, longitude);
                
    //         });
    // }
    // Get Results Data
    //-------------------------------------------
    //-------------------------------------------

    // Weather API Data
    //-------------------------------------------
    // --------------TO DO------------------   
    // Pull and store data
    // Cycle through the optional checkboxes (restaurants, dessert, movies, attractions)
    // Call the appropriate function

   

    function sunset() {

        //var sunQueryURL = "https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude; 


        $.ajax({
            url: "https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude,
            method: "GET",
        })

            .then(function (response) {

                console.log(response.results);

            });

    }

    function weather() {

        var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";

        var weatherQueryURL = "";

        if (zip_code) {

            weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + userPlace + "&appid=" + weatherAPIKey;

        } else {

            weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userPlace + "&appid=" + weatherAPIKey;

        }

        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        })

            .then(function (response) {

                // Log the resulting object

                console.log(response);

                var windy = "";
                var cloudy = "";

                if (response.wind.speed < 11) {
                    windy = "Light breeze";
                }

                if (response.wind.speed > 10 && response.wind.speed < 39) {
                    windy = "Moderate wind";
                }

                if (response.wind.speed > 38 && response.wind.speed < 62) {
                    windy = "Strong wind";
                }

                if (response.wind.speed > 61 && response.wind.speed < 103) {
                    windy = "Very strong wind";
                }

                if (response.wind.speed > 102) {
                    windy = "Hurricane";
                }

                if (response.clouds.all < 11) {
                    cloudy = "Sunny";
                }
                if (response.clouds.all > 10 && response.clouds.all < 26) {
                    cloudy = "Slightly cloudy";
                }

                if (response.clouds.all > 25 && response.clouds.all < 51) {
                    cloudy = "Partly cloudy";
                }

                if (response.clouds.all > 52 && response.clouds.all < 76) {
                    cloudy = "Very cloudy";
                }

                if (response.clouds.all > 75) {
                    cloudy = "Overcast";
                }

                // Transfer content to HTML for current weather information 
                var temp = (response.main.temp - 273.15) * 1.80 + 32;
                var highTemp = (response.main.temp_max - 273.15) * 1.80 + 32;
                var lowTemp = (response.main.temp_min - 273.15) * 1.80 + 32;

                $("#resultsWeather").empty();
                $("#resultsWeather").html("<br>Current Temperature: " + temp.toFixed(1) + " | High: " + highTemp.toFixed(1) + " | Low: " + lowTemp.toFixed(1) + " | " + cloudy + " | " + windy + "<br>");

            });

    }

    function forecast() {
        var forecastAPIKey = "166a433c57516f51dfab1f7edaed8413";

        var forecastQueryURL = "";

        if (zip_code) {

            forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + userPlace + "&appid=" + forecastAPIKey;

        } else {

            forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userPlace + "&appid=" + forecastAPIKey;

        }
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        })

            .then(function (response) {
                $("#resultsForecast").empty();

                var hours = [7, 15, 23, 31, 39];
                var days = [1, 2, 3, 4, 5];

                var windy = "";
                var cloudy = "";

                function wind(i) {
                    if (response.list[i].wind.speed < 11) {
                        windy = "Light breeze";
                    }

                    if (response.list[i].wind.speed > 10 && response.list[i].wind.speed < 39) {
                        windy = "Moderate wind";
                    }

                    if (response.list[i].wind.speed > 38 && response.list[i].wind.speed < 62) {
                        windy = "Strong wind";
                    }

                    if (response.list[i].wind.speed > 61 && response.list[i].wind.speed < 103) {
                        windy = "Very strong wind";
                    }

                    if (response.list[i].wind.speed > 102) {
                        windy = "Hurricane";
                    }

                }

                function cloud(i) {
                    if (response.list[i].clouds.all < 11) {
                        cloudy = "Sunny";
                    }
                    if (response.list[i].clouds.all > 10 && response.list[i].clouds.all < 26) {
                        cloudy = "Slightly cloudy";
                    }

                    if (response.list[i].clouds.all > 25 && response.list[i].clouds.all < 51) {
                        cloudy = "Partly cloudy";
                    }

                    if (response.list[i].clouds.all > 52 && response.list[i].clouds.all < 76) {
                        cloudy = "Very cloudy";
                    }

                    if (response.list[i].clouds.all > 75) {
                        cloudy = "Overcast";
                    }

                }

                for (i = 0; i < hours.length; i++) {
                    var temp = (response.list[hours[i]].main.temp - 273.15) * 1.80 + 32;
                    wind(hours[i]);
                    cloud(hours[i])

                    $("#resultsForecast").append("Day " + (i + 1) + ": Avg. Temp.: " + temp.toFixed(1) + " | " + windy + " | " + cloudy + "<br>");
                }

            });

    }



    // Restaurants API Data
    //-------------------------------------------
    // --------------TO DO------------------   
    // function restaurantHelper(lat, longi) {

    //     console.log(">>>>>> Inside Restaurant>>>>>");
    //     console.log(lat);
    //     console.log(longi);

    //     var apiKey = " d0782c26de92e778b76dcefa06a8ea95";
    //     $.ajax({
    //         url: "https://developers.zomato.com/api/v2.1/search?" + "&lat=" + latitude + "&lon=" + longitude,

    //         method: "GET",
    //         headers: { "user-key": apiKey },

    //     }).then(function (response) {
    //         console.log("-----Test restaurant----");
    //         console.log(response);
    //     })

    // }
    function restaurantUpdate(needRestaurant){
        var apiKey = " d0782c26de92e778b76dcefa06a8ea95";
        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?" + "&lat=" + latitude + "&lon=" + longitude,
            method:"GET",
            headers: { "user-key": apiKey},
        }) .then(function(response){
            console.log("-----restUpdate----");
            console.log(response);
            var results = response;
            for (let i = 0; i<results.restaurants.length; i++){
                // console.log(">>>TITLE>>>>");
                // console.log(results.restaurants[i].restaurant.name);
                
                var name = results.restaurants[i].restaurant.name;
                var cuisines = results.restuarants[i].restaurant.cuisines;
                var details = results.restauransts[i].restaurant.url;
                var aTag = $("<a>").attr("href" , details).text(details);
                var newRow = $("<tr>").append(
                    $("<td>").text(name),
                    $("<td>").text(cuisines),
                    $("<td>").append(aTag)

                );
                $("#restaurant-table > tbody").append(newRow);
            }

        })  
    }
    // Pull and store data 
    // Cycle through the remaining optional checkboxes (dessert, movies, attractions)
    // Call the appropriate function
    // If none checked, call the Return Results function

    // Dessert Spots API Data
    //-------------------------------------------
    // --------------TO DO------------------   
    function dessertShops(needDessert){
    if(needDessert){
    var apiKey = " d0782c26de92e778b76dcefa06a8ea95";
$.ajax({
    url: "https://developers.zomato.com/api/v2.1/search?q=desserts" + "&lat=" + latitude + "&lon=" + longitude,

    method:"GET",
    headers: { "user-key": apiKey},

}).then(function(response){

    console.log(response);
    // if(needDessert){
    var results = response;
    console.log(results);
    console.log("------Test----");
    console.log(results.restaurants[0].restaurant.name);
   
    for (let i = 0; i<results.restaurants.length; i++){
    //     console.log("###titleonly####");
    //    console.log(results.restaurants[i].restaurant.name);
    //    console.log(results.restaurants[i].restaurant.location);
    //    console.log(results.restaurants[i].restaurant.highlights);
       var name = results.restaurants[i].restaurant.name;
       var location = results.restaurants[i].restaurant.location.address;
       var timings = results.restaurants[i].restaurant.timings;
     
       var newRow = $("<tr>").append(
           $("<td>").text(name),
            $("<td>").text(location),
                $("<td>").text(timings)
                   
       );
       $("#desserts-table > tbody").append(newRow);
    // //    console.log("!!!!!!LOCATION!!!!");
    // //    console.log(results.restaurants[i].restaurant.location);
    
    //    }
}
})
    }
}


    // Pull and store data 
    // Cycle through the remaining optional checkboxes (movies and attractions)
    // Call the appropriate function
    // If neither checked, call the Return Results function

    // Movies API Data
    //-------------------------------------------
    // --------------TO DO------------------   
    // Pull and store data 
    // Check if Attractions was checked, if so call Attractions function
    // If not, call the Return Results function


    function updateMovies(needMovies) {
        if(needMovies){
        var apiKey = "wgkpzjdk25tfwrybxqvrtv2p";
        var queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + dateYear + "-" + dateMonth + "-" + dateDay + "&zip=" + userPlace + "&api_key=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(queryURL);
            // console.log(response);
            var resultsMovies = response;
            $("#movie-table > tbody").empty();
            for (let i = 0; i < resultsMovies.length; i++) {
                // console.log(resultsMovies[i]);
                var title = resultsMovies[i].title;
                var details = resultsMovies[i].officialUrl;
                var aTag = $("<a>").attr("href", details).text(details);
                var newRow = $("<tr>").append(
                    $("<td>").text(title),
                    $("<td>").append(aTag)
                );
                $("#movie-table > tbody").append(newRow);

            }


            // if (needMovies) {

            //     let movies = resultsMovies;
            //     console.log("-----movie----");
            //     console.log(movies);
            //     let output = '';
            //     $.each(movies, (index, movie) => {
            //         //console.log(movie.title);

            //         //output += $(movie.title)
            //         output += `
            //     <div class = "col-md-3">
            //     <div class = "well text-center">
            //     <h5>${movie.title}</h5>

            //     <a href = "${movie.officialUrl}"  target="_blank" class ="anchorbutton">Movie Details</a><br>
            //     </div>
            //     </div>
            //     `;
            //     });
            //     $("#moviesoutpu").html(output);
            // }
        });
    }
}


    // Attractions API Data
    //-------------------------------------------
    // --------------TO DO------------------      
    // Pull and store data 
    // Call Return Results function


    // Return Results Data to DOM/Email
    //-------------------------------------------
    //-------------------------------------------

    // Function to Write to DOM
    // Show User Results and Help pages
    // Show ONLY headers for results that were requested
    // Tested and Signed Off - __/__/____ PLK
    //-------------------------------------------
    // --------------TO DO------------------   

    $("#userResults").show();
    $("#userHelp").show();


    // Function to Email?  If so, need user's email address
    //-------------------------------------------
    // --------------TO DO------------------     


    // Help Data - return in modal
    //-------------------------------------------
    //-------------------------------------------

    // Day in History API Data
    //-------------------------------------------
    // Tested and Signed Off - __/__/____ PLK
    // --------------IN PROGRESS (Pam) ------------------   

    // AJAX Call when Day In History Button Clicked
    $("#history").on("click", function (event) {

        // Construct API URL with date supplied by user
        var queryURL = "https://byabbe.se/on-this-day/" + dateMonth.replace(/^0+/, '') + "/" + dateDay.replace(/^0+/, '') + "/events.json";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.events);

            $("#resultsHistory").html(response.events[0].year + " " + response.events[0].description + "<b>");

        });

    });

    // Movie Reviews API Data
    //-------------------------------------------
    // --------------TO DO------------------   --   
    //.......In Progress(jyochsna)----
    //----zipcode need to be retrieved from UI------
    //Ajax call for movies

    // Book Reviews API Data
    //-------------------------------------------
    // --------------TO DO------------------      


    // Joke of the Day API Data
    //-------------------------------------------
    // Tested and Signed Off - __/__/____ PLK
    // --------------IN PROGRESS (Pam) ------------------   

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.jokes.one/jod?category=jod",
        "method": "GET",
    }

    // AJAX Call with settings when Joke of the Day Button Clicked
    $("#jokes").on("click", function (event) {

        // Preventing the submit button from trying to submit the form
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();

        // Query the data from the API
        //-----Pulls the joke for the CURRENT day only-------------
        $.ajax(settings).done(function (response) {

            // Console Log Results from API
            console.log(response);
            console.log(response.contents.jokes[0].joke.text);

            // Create a Modal and display results to User
            // $("#resultsJoke").html(joke);
            $("#resultsJoke").html(response.contents.jokes[0].joke.text);

        });
    });

    // Inspirational Quote of the Day API Data
    //------------------------------------------- 
    //-----Pulls the quote for the CURRENT day only-----------

    var settingsQuotes = {
        "async": true,
        "crossDomain": true,
        "url": "http://quotes.rest/qod.json",
        "method": "GET",
    }

    $("#quotes").on("click", function (event) {

        $.ajax(settingsQuotes).done(function (response) {

            // Console Log Results from API
            // console.log(response);
            // console.log(response.contents.quotes[0].quote);

            // Create a Modal and display results to User
            $("#resultsQuotes").html(response.contents.quotes[0].quote);

        });

    });

});

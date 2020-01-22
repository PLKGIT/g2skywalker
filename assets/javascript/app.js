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
    var userDate;
    var userPlace; // 01182020 - Zipcode only right now
    var needRestaurant;
    var needDessert;
    var needMovies;
    var needAttractions;

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

        // Form Validation
        //------------------TO DO --------------------
        //          Validate only alpha characters in User name
        //          Validate only numeric characters in zipcode
        //          Validate max 5 numbers in zipcode
        //          Validate at least 1 checkbox checked
        // NOTE: Date is controlled by the calendar, even if user tries to type something, it is overwritten with a valid date

        // Store user input from Form into defined variables
        userName = $("#userName").val().trim().toUpperCase();
        console.log("---User's First Name---");
        console.log(userName);

        userDate = $("#userDate").val();
        console.log("---Selected Date---");
        console.log(userDate);

        dateMonth = userDate.substr(0, 2);
        console.log("---Selected Month---");
        console.log(dateMonth);

        dateDay = userDate.substr(2, 2);
        console.log("---Selected Day---");
        console.log(dateDay);

        dateYear = userDate.substr(4, 4);
        console.log("---Selected Year---");
        console.log(dateYear);

        userPlace = $("#userPlace").val();
        console.log("---Date Location---");
        console.log(userPlace);

        // Setting value of variable based on whether checkbox is checked
        if (document.getElementById("needRestaurant").checked === true) {
            needRestaurant = true;
        } else {
            needRestaurant = false;
        }

        console.log("---Need Restaurant---");
        console.log(needRestaurant);

        // Setting value of variable based on whether checkbox is checked
        if (document.getElementById("needDessert").checked === true) {
            needDessert = true;
        } else {
            needDessert = false;
        }
        console.log("---Need Dessert---");
        console.log(needDessert);

        // Setting value of variable based on whether checkbox is checked
        if (document.getElementById("needMovies").checked === true) {
            needMovies = true;
        } else {
            needMovies = false;
        }
        console.log("---Need Movies---");
        console.log(needMovies);

        // Setting value of variable based on whether checkbox is checked
        if (document.getElementById("needAttractions").checked === true) {
            needAttractions = true;
        } else {
            needAttractions = false;
        }
        console.log("---Need Attractions---");
        console.log(needAttractions);

        // Call Weather Function 
        //-----------TO DO--------------

        weather();
        forecast();

        //this will update movies in UI
        updateMovies(needMovies);

    });

    // Get Results Data
    //-------------------------------------------
    //-------------------------------------------

    // Weather API Data
    //-------------------------------------------
    // --------------TO DO------------------   
    // Pull and store data
    // Cycle through the optional checkboxes (restaurants, dessert, movies, attractions)
    // Call the appropriate function


    function weather() {

        var weatherAPIKey = "166a433c57516f51dfab1f7edaed8413";
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "zip=" + userPlace + "&appid=" + weatherAPIKey;

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
                    windy = "light breeze";
                }

                if (response.wind.speed > 10 && response.wind.speed < 39) {
                    windy = "moderate wind";
                }

                if (response.wind.speed > 38 && response.wind.speed < 62) {
                    windy = "strong wind";
                }

                if (response.wind.speed > 61 && response.wind.speed < 103) {
                    windy = "very strong wind";
                }

                if (response.wind.speed > 102) {
                    windy = "hurricane";
                }

                if (response.clouds.all < 11) {
                    cloudy = "sunny";
                }
                if (response.clouds.all > 10 && response.clouds.all < 26) {
                    cloudy = "slightly cloudy";
                }

                if (response.clouds.all > 25 && response.clouds.all < 51) {
                    cloudy = "partly cloudy";
                }

                if (response.clouds.all > 52 && response.clouds.all < 76) {
                    cloudy = "very cloudy";
                }

                if (response.clouds.all > 75) {
                    cloudy = "overcast";
                }

                // Transfer content to HTML for current weather information 
                var temp = (response.main.temp - 273.15) * 1.80 + 32;
                var highTemp = (response.main.temp_max - 273.15) * 1.80 + 32;
                var lowTemp = (response.main.temp_min - 273.15) * 1.80 + 32;

                $("#weather").html("<h1>" + response.name + "</h1><br>Current Temperature: " + temp.toFixed(2) + "<br>High: " + highTemp.toFixed(2) + "<br>Low: " + lowTemp.toFixed(2) + "<br>" + cloudy + "<br>" + windy);

            });

    }

    function forecast() {
        var forecastAPIKey = "166a433c57516f51dfab1f7edaed8413";
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
            "zip=" + userPlace + "&appid=" + forecastAPIKey;

        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        })

            .then(function (response) {

                var hours = [7, 15, 23, 31, 39];
                var days = [1, 2, 3, 4, 5];

                var windy = "";
                var cloudy = "";

                function wind(i) {
                    if (response.list[i].wind.speed < 11) {
                        windy = "light breeze";
                    }

                    if (response.list[i].wind.speed > 10 && response.list[i].wind.speed < 39) {
                        windy = "moderate wind";
                    }

                    if (response.list[i].wind.speed > 38 && response.list[i].wind.speed < 62) {
                        windy = "strong wind";
                    }

                    if (response.list[i].wind.speed > 61 && response.list[i].wind.speed < 103) {
                        windy = "very strong wind";
                    }

                    if (response.list[i].wind.speed > 102) {
                        windy = "hurricane";
                    }

                }

                function cloud(i) {
                    if (response.list[i].clouds.all < 11) {
                        cloudy = "sunny";
                    }
                    if (response.list[i].clouds.all > 10 && response.list[i].clouds.all < 26) {
                        cloudy = "slightly cloudy";
                    }

                    if (response.list[i].clouds.all > 25 && response.list[i].clouds.all < 51) {
                        cloudy = "partly cloudy";
                    }

                    if (response.list[i].clouds.all > 52 && response.list[i].clouds.all < 76) {
                        cloudy = "very cloudy";
                    }

                    if (response.list[i].clouds.all > 75) {
                        cloudy = "overcast";
                    }

                }

                for (i = 0; i < hours.length; i++) {
                    var temp = (response.list[hours[i]].main.temp - 273.15) * 1.80 + 32;
                    wind(hours[i]);
                    cloud(hours[i])
                    $("#forecast").append("<br><h5>" + response.city.name + " Day " + i + "</h5><br>Temperature: " + temp.toFixed(2) + "<br>" + windy + "<br>" + cloudy + "<br>");
                }

            });

    }

    // Restaurants API Data
    //-------------------------------------------
    // --------------TO DO------------------   
    // Pull and store data 
    // Cycle through the remaining optional checkboxes (dessert, movies, attractions)
    // Call the appropriate function
    // If none checked, call the Return Results function
    
    // Dessert Spots API Data
    //-------------------------------------------
    // --------------TO DO------------------     
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
        // var movieAPIKey = "wgkpzjdk25tfwrybxqvrtv2p"
        var apiBaseURL = 'http://api.themoviedb.org/3/'
     var queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=f05036111537ccafc5f4609725114002";
     $.ajax({
         url: queryURL,
         method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        resultsMovies = response;
    

        if (needMovies) {
            
                let movies = resultsMovies;
                console.log("-----movie----");
                console.log(movies);
                let output = '';
                $.each(movies, (index, movie) => {
                    //console.log(movie.title);

                    //output += $(movie.title)
                    output += `
                <div class = "col-md-3">
                <div class = "well text-center">
                <h5>${movie.title}</h5>
                
                <a href = "${movie.officialUrl}"  target="_blank" class ="anchorbutton">Movie Details</a><br>
                </div>
                </div>
                `;
                });
                $("#moviesoutpu").html(output);

            
       
        } 
    });
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

        // Preventing the submit button from trying to submit the form
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();

        // Construct API URL with date supplied by user
        var queryURL = "https://byabbe.se/on-this-day/" + dateMonth.replace(/^0+/, '') + "/" + dateDay.replace(/^0+/, '') + "/events.json";

        // Query the data from the API

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Console Log Results from API
            console.log(queryURL);
            console.log(response);

            // Create a Modal and display results to User
            //---------------TO DO-----------------------

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
            //---------------TO DO-----------------------

        });
    });



    // Inspirational Quotes API Data
    //-------------------------------------------
    // --------------TO DO------------------      


});
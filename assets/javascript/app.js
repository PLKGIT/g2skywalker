/* JavaScript/jQuery for Project #1 */

$(document).ready(function () {

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

        dateMonth = userDate.substr(0,2);
        console.log("---Selected Month---");
        console.log(dateMonth);

        dateDay = userDate.substr(2,2);
        console.log("---Selected Day---");
        console.log(dateDay);

        dateYear = userDate.substr(4,4);
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
    }).then(function(response) {

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
/* Logic for Project #1 */

$(document).ready(function () {

// Global Variables
var userName;
var userDate;
var userPlace;
var needRestaurant;
var needDessert;
var needMovies;
var needAttractions;
var needMovies;
var longitude;
var latitude;
var helpMovies;
var helpBooks;
var helpQuotes;
var helpJokes;


// Captures user input on submit click
$("#submit").on("click", function (event) {
    // Prevents form action default 
    event.preventDefault();

    // Stores user input from form in userInput variable
    userName = $("#userName").val();
    console.log(userName);
});
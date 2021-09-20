var cities = [];


var cityFromEl=document.querySelector('#search-form');
var cityInputEl=document.querySelector('#city');
var weatherContainerEl=document.querySelector('#current-weather-container');
var citySearchINputEl=document.querySelector('#searched-city');
var forecastTitle = document.querySelector('#forecast');
var forecastContainerEl = document.querySelector('#fiveday');
var pastSearchButtonEl = document.querySelector('#past-search-buttons');

// from submit handler
var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value='';
    } else {
        alert('Please Enter a City')
    }
    saveSearch();
    pastSearch(city);
}

// save recent cearches
var saveSearch = function(){

};

//api call to get weather
var getWeather = function(){
    var apiKey='c3bffa45313b11091ad9031fc5d8f2e7';
    var apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
};

// function to display the weahter
var displayWeather = function() {

};

// api call to get uvindex
var getUv = function(){
    var apiKey='c3bffa45313b11091ad9031fc5d8f2e7';
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

};

// function to display the uvIndex
var displayUv = function(){

};

// api call to get the 5 day forecast
var get5Day = function(){
    var apiKey='c3bffa45313b11091ad9031fc5d8f2e7';
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    
};

// display 5day forecast
var display5Day = function(){

}

// display the most recent searches
var pastSearch = function(){

}

// handle the event of clicking on one of those searches
var pastSearchHandler = function(){

}


cityFromEl.addEventListener('submit', formSubmitHandler);
pastSearchButtonEl.addEventListener('click', pastSearchHandler);




// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

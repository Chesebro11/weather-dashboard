var cities = [];

var cityFromEl=document.querySelector('#search-form');
var cityInputEl=document.querySelector('#city');
var weatherContainerEl=document.querySelector('#current-weather-container');
var citySearchINputEl=document.querySelector('#searched-city');
var forecastTitle = document.querySelector('#forecast');
var forecastContainerEl = document.querySelector('#fiveday');
var pastSearchButtonEl = document.querySelector('#past-search-buttons');
























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

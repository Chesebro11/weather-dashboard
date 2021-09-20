var cities = [];


var cityFormEl=document.querySelector('#search-form');
var cityInputEl=document.querySelector('#city');
var weatherContainerEl=document.querySelector('#current-weather-container');
var citySearchInputEl=document.querySelector('#searched-city');
var forecastTitle = document.querySelector('#forecast');
var forecastContainerEl = document.querySelector('#fiveday');
var searchHistoryButtonEl = document.querySelector('#past-search-buttons');

// from submit handler
var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city) {
        getWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value='';
    } else {
        alert('Please Enter a City')
    }
    saveSearch();
    searchHistory(city);
}

// save recent cearches
var saveSearch = function(){
    localStorage.setItem('cities', JSON.stringify(cities));
};

//api call to get weather
var getWeather = function(city){
    var apiKey='c3bffa45313b11091ad9031fc5d8f2e7';
    var apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiUrl)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city)
        })
    })
};

// function to display the weahter
var displayWeather = function(weather, searchedCity) {
    // need to clear old content if any
    weatherContainerEl.textContent='';
    citySearchInputEl.textContent=searchedCity;

    console.log(weather);

    //create date element
    var currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInputEl.appendChild(currentDate);

   //create an image element for the weather Icon
   var weatherIcon = document.createElement('img')
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInputEl.appendChild(weatherIcon);

   // span element to hold temperature
   var temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"

   // create span element to hold humidity
   var humidityEl = document.createElement('span');
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %"
   humidityEl.classList = 'list-group-item'

   // create span element to hold wind speed
   var windSpeedEl = document.createElement('span');
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

   // append new elements to the page
   weatherContainerEl.appendChild(temperatureEl);

   weatherContainerEl.appendChild(humidityEl);

   weatherContainerEl.appendChild(windSpeedEl);

   // grab coordinate data to pass on to getUV
   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUv(lat,lon)
};

// api call to get uvindex
var getUv = function(lat, lon){
    var apiKey='c3bffa45313b11091ad9031fc5d8f2e7';
    var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

    fetch(apiUrl)
    .then(function(response){
        response.json().then(function(data){
            displayUv(data);
            console.log(data)
        })
    })
};

// function to display the uvIndex
var displayUv = function(index){
    var uvIndexEl = document.createElement('div');
    uvIndexEl.textContent= "UV Index: "
    uvIndexEl.classList ='list-group-item'

    uvIndexValue=document.createElement('span')
    uvIndexValue.textContent = index.value

    //console.log(index.value)

    if(index.value <=2){
        uvIndexValue.classList = 'favorable'
    } else if (index.value >2 && index.value<=8){
        uvIndexValue.classList = 'moderate'
    } else if(index.value >8){
        uvIndexValue.classList = "severe"
    }

    uvIndexEl.appendChild(uvIndexValue);

    weatherContainerEl.appendChild(uvIndexEl);
    // var city ='portland'
    //get5Day(city);

};

// api call to get the 5 day forecast
var get5Day = function(city){
    var apiKey='c3bffa45313b11091ad9031fc5d8f2e7';
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5DayForecast(data);
        });
    });
};

// display 5day forecast
var display5DayForecast = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

       //console.log(dailyForecast)

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);

        // console.log(forecastEl);
       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

};

// display the most recent searches
var searchHistory = function(searchHistory){

    searchHistoryhEl = document.createElement('button');
    searchHistoryhEl.textContent = searchHistory;
    searchHistoryEl.classList = 'd-flex w-100 btn-light border p-2';
    searchHistoryEl.setAttribute('data-city', searchHistory)
    searchHistoryEl.setAttribute('type', 'submit');

    searchHistoryButtonEl.prepend(searchHistoryEl);

}

// handle the event of clicking on one of those searches
var searchHistoryHandler = function(event){
    var city = event.target.getAttribute('data-city')
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}


cityFormEl.addEventListener('submit', formSubmitHandler);
searchHistoryButtonEl.addEventListener('click', searchHistoryHandler);




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

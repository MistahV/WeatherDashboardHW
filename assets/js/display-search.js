var resultContentEl = document.querySelector('#cityWeather-container');
var searchFormEl = document.querySelector('#user-form');
var searchInput = document.querySelector('#searchCity')
var searchHistoryEl = document.querySelector('#searchedCities')
var currentCard = document.querySelector('#currentWeather')
var currentBody = document.querySelector('#currentBody')
var fiveDayWeather = document.querySelector('#fiveDayWeather-container')
var fiveDayCard = document.querySelector('#fiveDayCard')




function handleSearchFormSubmit(event) {
  event.preventDefault();
 
  var searchInputVal = searchInput.value;

  if (!searchInputVal) {
    alert('You need to correctly enter a city name!');
    return;
  }

  
  searchApiWeather();

}



function searchApiWeather(city) {
  var search = searchInput.value
  console.log(city)
  if(city) {
    search = city;
  }
    var requestURLCity = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d6b1c98ae6030744047ac8cf7d9346ba`;
      
    if(!city) {
      cityHistory.push(searchInput.value)
      localStorage.setItem("cityHistory", JSON.stringify(cityHistory))
    }
     fetch(requestURLCity)
        .then(response => response.json())
        .then(firstData => {
           let cityLon = (firstData.coord.lon);
           let cityLat = (firstData.coord.lat);

           fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly&appid=d6b1c98ae6030744047ac8cf7d9346ba&units=imperial`)
              .then(response => response.json())
              .then(data => {
                  
                  showWeather(data, firstData.name)
              })
        })
 }
  

function searchByBtn () {
  sampleCity = this.textContent;
  searchApiWeather(sampleCity)
}



function showWeather (weatherObj, cityName) {
  
  // convert Unix time to date stamp

  const unixTime = weatherObj.current.dt;
  const timeMillisecs = unixTime * 1000;
  const currentDateObj = new Date(timeMillisecs);
  const currentDate = currentDateObj.toLocaleString("en-US", {timeZoneName: "short"});

  // Shows results for current weather
  
  currentBody.innerHTML = ''

  currentCard.setAttribute('style', 'display: block');

  var titleEl = document.createElement('h2');
  titleEl.textContent = `${cityName} (current)`;

  var dateEl = document.createElement('p');
  dateEl.textContent = currentDate

  var weatherConditionsEl = document.createElement('div')
  let weatherIcon = weatherObj.current.weather[0].icon;
  let weatherIconURL = `<img src=http://openweathermap.org/img/wn/${weatherIcon}.png>`;
  weatherConditionsEl.innerHTML = `Weather Conditions: ${weatherIconURL}`

  var tempContentEl = document.createElement('p');
  tempContentEl.textContent = `Temp: ${weatherObj.current.temp}`;

  var humContentEl = document.createElement('p');
  humContentEl.textContent = `Humidity: ${weatherObj.current.humidity}`;

  var windContentEl = document.createElement('p');
  windContentEl.textContent = `Wind Speed: ${weatherObj.current.wind_speed}`;

  var UVContentEl = document.createElement('p');
  UVContentEl.textContent = `UV Index: ${weatherObj.current.uvi}`;
  if (weatherObj.current.uvi < 3) {
     UVContentEl.className = 'UVIndexFair'
  } else if (weatherObj.current.uvi >= 3 && weatherObj.current.uvi < 6) {
     UVContentEl.className = 'UVIndexModerate'
  } else {
     UVContentEl.className = 'UVIndexSevere'
  };

  
  currentBody.append(titleEl, dateEl, weatherConditionsEl, tempContentEl, humContentEl, windContentEl, UVContentEl);


  // Shows results for five day weather forecast
  
 
  fiveDayCard.setAttribute('style', 'display: block;')
  fiveDayCard.innerHTML = ""
  
  let day = weatherObj.daily
  for(i=1; i<=5; i++) {
    console.log(day[i])

    var dailyCard = document.createElement('div');
      dailyCard.className = 'fiveDayWeather';

      var dailyDateObj = new Date(day[i].dt*1000)
      var dailyDate = dailyDateObj.toLocaleString("en-US", {timeZoneName: "short"})
      var dailyDateEl = document.createElement('p');
      dailyDateEl.textContent = `Future weather for ${cityName} on ${dailyDate}`;

      var fiveDayWeatherConditionsEl = document.createElement('div')
      let fiveDayWeatherIcon = day[i].weather.icon
      let fiveDayWeatherIconURL = `<img src=http://openweathermap.org/img/wn/${fiveDayWeatherIcon}.png>`;
      fiveDayWeatherConditionsEl.innerHTML = `Weather Conditions: ${fiveDayWeatherIconURL}`

      var fiveDayTemp = document.createElement('p');
      fiveDayTemp.textContent = `Predicted Temp: ${day[i].temp.day}`;

      var fiveDayHum = document.createElement('p');
      fiveDayHum.textContent = `Predicted Humidity: ${day[i].humidity}`;

      var fiveDayWind = document.createElement('p');
      fiveDayWind.textContent = `Predicted Wind Speed: ${day[i].wind_speed}`;

      var fiveDayUVContentEl = document.createElement('p');
      fiveDayUVContentEl.textContent = `UV Index: ${day[i].uvi}`;
        if (day[i].uvi < 3) {
           fiveDayUVContentEl.className = 'UVIndexFair'
        } else if (day[i].uvi >= 3 && day.uvi < 6) {
           fiveDayUVContentEl.className = 'UVIndexModerate'
        } else {
           fiveDayUVContentEl.className = 'UVIndexSevere'
        };
      
      dailyCard.append(dailyDateEl, fiveDayWeatherConditionsEl, fiveDayTemp, fiveDayHum, fiveDayWind, fiveDayUVContentEl);

      fiveDayCard.append(dailyCard);
    }


  
  // weatherObj.daily.forEach(
  //   day => {
      
      
  // )

  showSearch()
}



var cityHistory = [];
if(localStorage.getItem("cityHistory")){
  cityHistory = JSON.parse(localStorage.getItem("cityHistory"))
}

function showSearch() {

  searchHistoryEl.innerHTML = ""

  cityHistory.forEach(index => {
    let cityButton = document.createElement('button')
    searchHistoryEl.appendChild(cityButton);
    cityButton.textContent = index;
    cityButton.className = "cityButton";
    cityButton.addEventListener("click", searchByBtn)
  })

}

showSearch()

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


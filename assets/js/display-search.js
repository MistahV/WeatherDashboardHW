var resultContentEl = document.querySelector('#cityWeather-container');
var searchFormEl = document.querySelector('#user-form');
var searchInput = document.querySelector('#searchCity')
var searchHistoryEl = document.querySelector('#searchedCities')
var resultCard = document.querySelector('#weatherResult')
var resultBody = document.querySelector('#resultBody')




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
                  
                  console.log(data)
                  showWeather(data, firstData.name)
                  
              })
        })
 }
  

function searchByBtn () {
  sampleCity = this.textContent;
  searchApiWeather(sampleCity)
}



function showWeather (weatherObj, cityName) {
  resultBody.innerHTML = ''

  // var resultCard = document.createElement('div');
  // resultCard.classList.add('card');

  // var resultBody = document.createElement('div');
  // resultBody.classList.add('card-body');
  // resultCard.append(resultBody);

  resultCard.setAttribute('style', 'display: block');


  var titleEl = document.createElement('h2');
  titleEl.textContent = cityName;


  var weatherConditionsEl = document.createElement('div')
  let weatherIcon = weatherObj.current.weather[0].icon;
  let weatherIconURL = `<img src=http://openweathermap.org/img/wn/${weatherIcon}.png>`;
  console.log(weatherIconURL);
  weatherConditionsEl.innerHTML = `Current weather: ${weatherIconURL}`

  
  var tempContentEl = document.createElement('p');
  tempContentEl.textContent = `Temp: ${weatherObj.current.temp}`;

  var humContentEl = document.createElement('p');
  humContentEl.textContent = `Humidity: ${weatherObj.current.humidity}`;

  var windContentEl = document.createElement('p');
  windContentEl.textContent = `Wind Speed: ${weatherObj.current.wind_speed}`;

  var UVContentEl = document.createElement('p');
  UVContentEl.textContent = `UV Index: ${weatherObj.current.uvi}`;
  UVContentEl.className = 'UVIndex'


  resultBody.append(titleEl, weatherConditionsEl, tempContentEl, humContentEl, windContentEl, UVContentEl);

  // resultContentEl.append(resultCard);
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
    cityButton.addEventListener("click", searchByBtn)
  })

}

showSearch()

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


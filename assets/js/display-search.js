var resultContentEl = document.querySelector('#cityWeather-container');
var searchFormEl = document.querySelector('#user-form');
var searchInput = document.querySelector('#searchCity')
var searchHistoryEl = document.querySelector('#searchedCities')


// showSearch();


function handleSearchFormSubmit(event) {
  event.preventDefault();
 
  var searchInputVal = searchInput.value;
  console.log(searchInputVal)

  if (!searchInputVal) {
    alert('You need to correctly enter a city name!');
    return;
  }

  searchApiWeather();

  // saveSearch();


}


// function getParams() {
//   // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
//   var searchParamsArr = document.location.search.split('&');

//   // Get the query and format values
//   var query = searchParamsArr[0].split('=').pop();
//   var format = searchParamsArr[1].split('=').pop();

//   searchApi(query, format);
// }



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

           console.log(cityLon);
           console.log(cityLat);

           fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly&appid=d6b1c98ae6030744047ac8cf7d9346ba&units=imperial`)
              .then(response => response.json())
              .then(data => {
                  // let weatherInfo = (data.current);
                  // console.log(weatherInfo)
                  console.log(data)
                  showWeather(data, firstData.name)
                  // weatherInfo;
              })
        })
 }
  
   

 
  // fetch(requestUrlWeather)
  //   .then(response => response.json())
  //   .then(data => {
  //      let weatherInfo = (data.results);
  //      console.log(weatherInfo)
  // })
  
  //   .catch(function (error) {
  //     console.error(error);
  //   });


function searchByBtn () {
  sampleCity = this.textContent;
  searchApiWeather(sampleCity)
}


function showWeather (weatherObj, cityName) {
  resultContentEl.innerHTML = ''

  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = cityName;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.textContent = `Temp: ${weatherObj.current.temp}`
  

  resultBody.append(titleEl, bodyContentEl);

  resultContentEl.append(resultCard);
  showSearch()
}

// function saveSearch() {
//    localStorage.setItem('City', searchInput.value)
// }

var cityHistory = [];
if(localStorage.getItem("cityHistory")){
  cityHistory = JSON.parse(localStorage.getItem("cityHistory"))
}

function showSearch() {
  // let searchHistory = localStorage.getItem('City');

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

// getParams();

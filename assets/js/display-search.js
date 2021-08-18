var resultContentEl = document.querySelector('#cityWeather-container');
var searchFormEl = document.querySelector('#user-form');
var searchInput = document.querySelector('#searchCity')
var searchHistoryEl = document.querySelector('#searchedCities')


showSearch();


function handleSearchFormSubmit(event) {
  event.preventDefault();
 
  var searchInputVal = searchInput.value;
  console.log(searchInputVal)

  if (!searchInputVal) {
    alert('You need to correctly enter a city name!');
    return;
  }

  searchApiWeather(searchInputVal);

  saveSearch();

//set up local storage function to save search history?

}


// function getParams() {
//   // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
//   var searchParamsArr = document.location.search.split('&');

//   // Get the query and format values
//   var query = searchParamsArr[0].split('=').pop();
//   var format = searchParamsArr[1].split('=').pop();

//   searchApi(query, format);
// }



function searchApiWeather() {

    var requestURLCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=d6b1c98ae6030744047ac8cf7d9346ba`;
      
     fetch(requestURLCity)
        .then(response => response.json())
        .then(data => {
           let cityLon = (data.coord.lon);
           let cityLat = (data.coord.lat);

           console.log(cityLon);
           console.log(cityLat);

           return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLon}&lon=${cityLat}&exclude=minutely,hourly&appid=d6b1c98ae6030744047ac8cf7d9346ba`)
              .then(response => response.json())
              .then(data => {
                  let weatherInfo = (data.current);
                  console.log(weatherInfo)

                  return weatherInfo;
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



// Need to pass weather info from API function into showWeather function

function showWeather () {
  
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML = 
  

  resultBody.append(titleEl, bodyContentEl);

  resultContentEl.append(resultCard);
}

function saveSearch() {
   localStorage.setItem('City', searchInput.value)
}

function showSearch() {
  let searchHistory = localStorage.getItem('City');
  let cityButton = document.createElement('button')
  searchHistoryEl.appendChild(cityButton);
  cityButton.innerHTML = searchHistory;
}



searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// getParams();

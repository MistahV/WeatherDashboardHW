var resultContentEl = document.querySelector('#cityWeather-container');
var searchFormEl = document.querySelector('#user-form');
var searchInput = document.querySelector('#searchCity')


function handleSearchFormSubmit(event) {
  event.preventDefault();
 
  var searchInputVal = searchInput.value;
  console.log(searchInputVal)

  if (!searchInputVal) {
    alert('You need to correctly enter a city name!');
    return;
  }

  searchApi(searchInputVal);
}


// function getParams() {
//   // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
//   var searchParamsArr = document.location.search.split('&');

//   // Get the query and format values
//   var query = searchParamsArr[0].split('=').pop();
//   var format = searchParamsArr[1].split('=').pop();

//   searchApi(query, format);
// }


function searchApi() {

// One Call Weather API uses lon & lat coordinates for search...

// So, use original API to get city coordinates from user search input, then pass those coordinates into One Call API

  var requestURLCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=d6b1c98ae6030744047ac8cf7d9346ba`;
  
  fetch(requestURLCity)
    .then(response => response.json())
    .then(data => {
       let cityLon = (data.coord);
       let cityLat = (data.coord);

       console.log(cityLon);
       console.log(cityLan)
  })


  var requestUrlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly&appid=d6b1c98ae6030744047ac8cf7d9346ba`;

  fetch(requestUrlWeather)
    .then(response => response.json())
    .then(data => {
       let weatherInfo = (data.results);
       console.log(weatherInfo)
  })
  
    .catch(function (error) {
      console.error(error);
    });
}


// function showWeather (resultObj) {
//   console.log(resultObj);

//   // set up `<div>` to hold result content
//   var resultCard = document.createElement('div');
//   resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

//   var resultBody = document.createElement('div');
//   resultBody.classList.add('card-body');
//   resultCard.append(resultBody);

//   var titleEl = document.createElement('h3');
//   titleEl.textContent = resultObj.title;

//   var bodyContentEl = document.createElement('p');
//   bodyContentEl.innerHTML = 
  

//   resultBody.append(titleEl, bodyContentEl);

//   resultContentEl.append(resultCard);
// }





searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// getParams();

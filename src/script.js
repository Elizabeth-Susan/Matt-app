//12 timestamp is the number of milliseconds that has happened since 1970 creating a function formatDate that receives timestamp
function formatDate(timestamp) {
  //14 going from a timestamp (long number) to a date like "Friday 05:00"
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

//5 define the function that I want axios to call and response back from api
function displayTemperature(response) {
  //6 we know axios puts the actual response in data and further details like city can be taken
  console.log(response.data);
  //7 I want this console.log result to be displayed on the page as real temp add id to html as you want js data to be inserted into html
  //8 add ids to temperature number, search city and description and delete the previous fake data
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  //10 humidity and wind via span id
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  //11 changing the day, hour and minutes to last updated with span and id
  let dateElement = document.querySelector("#date");
  //15(1) changing the attributes src and alt txt by what is displayed in response.data
  let iconElement = document.querySelector("#icon");

  //25 access a global variable and move the actual celcius temp (store it inside the variable)
  celciusTemperature = response.data.main.temp;

  //32 add and remove this for default page upon loading a new searched city
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  //9 capitalize via CSS the first letter of description
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  //13 in response.data it mentions an integer with the milliseconds since 1970 so multiply by 1000 gives current time and date
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  //15(2)SETTING ATTRIBUTES OF AN ELEMENT iconElement.innerHTML = `http://openweathermap.org/img/wn/10d@2x.png`
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//19 function receives city-this serach function makes the AJAX call
function search(city) {
  //20 takes care of displaying the city so no city variable needed and move the entire api here
  let apiKey = "a8bb545115365cdae986d0ebd7521ddb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

//17 function receives event and add id to the search input
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  //18 logs the value entered in the search console.log(cityInputElement.value);
  //22 need to send the api call to fetch the data TO SEARCH
  search(cityInputElement.value);
}

//26 link of F temperature using global variable to avoid double calculations
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //30 whenever I click on the F remove the active class from celcius link
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  // math will be applied on the celcius temp
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//28 no need of formula as need the global variable to be displayed again
function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //31 whenever I click on the C remove the active class from fahrenheit link
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
//29 via CSS pretend thet the C and F are not links when clicked take off cursor with hand and underline and change color

//1 copy the apiKey
//let apiKey = "a8bb545115365cdae986d0ebd7521ddb";
//let city = "New York";
//2 update the apiUrl with units and apiKey
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//3 console.log(apiUrl); to check it is working
//4 fetch this url using axios
//axios.get(apiUrl).then(displayTemperature);

//24 new global variable=nothing on load KEEPS TRACK OF THE CELCIUS TEMP
let celciusTemperature = null;

//16 linking the form with js & adding eventListener
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//23 create a variable to target the F and whenever clicked display F temperature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//27 create a variable to target the C and whenever clicked display C temperature
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

//21 search for a default city upon loading the page
search("New York");

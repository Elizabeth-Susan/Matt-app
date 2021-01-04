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
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  //9 capitalize via CSS the first letter of description
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
//1 copy the apiKey
let apiKey = "a8bb545115365cdae986d0ebd7521ddb";
//2 update the apiUrl with units and apiKey
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
//3 console.log(apiUrl); to check it is working
//4 fetch this url using axios
axios.get(apiUrl).then(displayTemperature);

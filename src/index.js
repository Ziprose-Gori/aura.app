function updateWeather(response){
    let temperatureElement = document.querySelector("#temperature")
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity-data")
    let windElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon")
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time *1000);

    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`
    windElement.innerHTML = response.data.wind.speed
    humidityElement.innerHTML = response.data.temperature.humidity;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature)

}

    function formatDate(date){
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

        let day = days[date.getDay()]

        if (minutes < 10) {
            minutes = `0${minutes}`;
          }
        
          if (hours < 10) {
            hours = `0${hours}`;
          }
          return`${day} ${hours}:${minutes}`

    }

function searchCity(city){
    let apiKey = "b5969t3bd4a74d055o948a46d3f319e9"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`

    axios.get(apiUrl).then(updateWeather);
}
searchCity("Nairobi")

function handleSearch(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

function displayForecast(){
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";
    
    days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="forecast-day">
        <div class="forecast-date">${day}</div>
        <div class="forecast-icon">⛅</div>
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>15°C</strong>
          </div>
          <div class="forecast-temperature">9°C</div>
        </div>
      </div>
      `;
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}
displayForecast();

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch)

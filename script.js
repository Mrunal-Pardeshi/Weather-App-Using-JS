const cityInput = document.getElementById("city")
const searchBtn = document.getElementById("searchBtn")
const weather = document.getElementById("weather")

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    getWeather(city)
})


async function getWeather(city) {

    try {
        const apiKey = "8c5f831f67911d2c46b17d0d029ee383"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        weather.innerHTML = "<p>Loading...</p>"
        const response = await fetch(url)
        const data = await response.json()
        if(data.cod=="404"){
            weather.innerHTML="<h2>City Not Found</h2>"
            return;
        }
        weather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                            <h2>${data.name}, ${data.sys.country}</h2>
                            <h1>${Math.round(data.main.temp)}°C</h1>
                            <h3>${data.weather[0].main}</h3>
                            <p>${data.weather[0].description}</p>
                            <p>Feels Like: ${Math.round(data.main.feels_like)}°C</p>
                            <p>Humidity: ${data.main.humidity}%</p>
                            <p>Wind Speed: ${data.wind.speed} m/s</p>`;
    }
    catch (error) {
        weather.innerHTML = "<h2>Something went wrong.</h2>";
        console.log(error);
    }

}
const API_KEY = 'b99b615f6ce0643c193526cedf3fe1c6';

const SEARCH_BTN = document.getElementById("SearchBtn");
const SEARCH_INPUT = document.getElementById("SearchField");
const ERROR_MSG = document.getElementById("ErrorMsg");

const fetchWeather = async (city) => {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const wrapper = document.getElementById("WeatherBox");
        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json();
            weatherInfo(data);
            ERROR_MSG.textContent = "";
        } else {
            ERROR_MSG.textContent = "Podane miasto nie istnieje!";
            wrapper.textContent =""
        }

        
}

const weatherInfo = (city) => {
    const wrapper = document.getElementById("WeatherBox");
    const background = document.getElementById("Wrapper");
    const bgImg = document.getElementById("RightWrapper");

    if (convertTemp(city.main.temp) <= 10) {
        background.style.backgroundColor="#429bf5"
        bgImg.style.backgroundImage="url(./images/cloudy.jpg)"
    } else if (convertTemp(city.main.temp) > 20){
        background.style.backgroundColor="#f5bf42"
        bgImg.style.backgroundImage="url(./images/summer.jpg)"
    } else {
        background.style.backgroundColor="rgb(241, 238, 215)"
        bgImg.style.backgroundImage="url(./images/background.jpg)"
    }

    console.log(city)
    const icon = "http://openweathermap.org/img/w/" + city.weather[0].icon + ".png"
    wrapper.innerHTML = `
        <h2>${city.sys.country}, ${city.name}</h2>
        <h3>${convertTemp(city.main.temp)} °C</h3>
        <h3>${city.weather[0].main}</h3>

        <img src="${icon}">
    `
}


const convertTemp = (temp) => {
    return (temp - 275.15).toFixed() ;
}

const getLocation = () => {
    navigator.geolocation.getCurrentPosition( (res)=>showWeatherByLocation(res.coords) )
  }
  getLocation();

const showWeatherByLocation = async (position) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}`
    const response = await fetch(url);
    const data = await response.json();
    weatherInfo(data);
}

SEARCH_BTN.addEventListener("click", () => fetchWeather(SEARCH_INPUT.value));
SEARCH_INPUT.addEventListener("change", () => fetchWeather(SEARCH_INPUT.value));


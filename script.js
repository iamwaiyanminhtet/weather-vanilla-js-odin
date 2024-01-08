// main element
const tempEle = document.querySelector('#temperature');
const weatherConditionEle = document.querySelector('#weatherCondition');
const weatherImgEle = document.querySelector('.main-body img');
const cityEle = document.querySelector('#city');
const countryEle = document.querySelector('#country');

// search & change temp element
const searchBtn = document.querySelector('.search-btn');
const searchField = document.querySelector('#search-field');
const tempScaleChange = document.querySelector('#temperature-scale');
const body = document.querySelector('body');

// Global Variables
let tempScaleMode = 'Metric';
let colors = ['#002147','#3D0C02','#3B3C36','#40826D','#317873','#1B1B1B','#3D2B1F','#1d2d44','#212922','#5D707F'];

// get lan&lon of given city name
async function getLatLon(name) {
    try {
        // call to openweatherapi geolocation
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=9b7e10f1bbaa419497f5ad30d54d6503`, {
            mode : "cors"
        });
        const data = await response.json();
        return data;
    }catch (error) {
        console.log(error);
    }
}

// get weather data by city name
async function getWeatherData (name) {
   try {
    // get lat&lon
    const getCity = await getLatLon(name);
    const lat = getCity[0].lat;
    const lon = getCity[0].lon;

    // get weatherInfo
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${tempScaleMode}&appid=9b7e10f1bbaa419497f5ad30d54d6503`,{
        mode : "cors"
    });
    const data = response.json();
    return data;
   } catch (error) {
    console.log(error);
   }
}

// display in UI
function mainDisplay(temp,weatherCondition,icon,city,country) {
    weatherConditionEle.textContent = weatherCondition;
    weatherImgEle.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    cityEle.textContent = city;
    countryEle.textContent = country;

    switch (tempScaleMode) {
        case 'Default':
            tempEle.textContent = `${temp} K`
        break;
        case 'Metric':
            tempEle.textContent = `${temp} °C`
        break;
        case 'Imperial':
            tempEle.textContent = `${temp} °F`
        break;
    }
}

// fetch data & display data
function fetchAndDisplayWeather(searchValue) {
    getWeatherData(searchValue).then(data => {
        // covert use-ready value
        const temp = data.main.temp;
        const weatherCondition = data.weather[0].main;
        const icon = data.weather[0].icon;
        const city = data.name;
        const country = data.sys.country;
    
        mainDisplay(temp,weatherCondition,icon,city,country);
    });
}

fetchAndDisplayWeather('Mandalay');

// change temperature scale
tempScaleChange.addEventListener('change', () => {
    tempScaleMode = tempScaleChange.value;

    let searchValue = searchField.value.trim();
    if(!(searchValue === '' || searchValue === null)) {
        fetchAndDisplayWeather(searchValue);
    }
});

// search btn clicks
searchBtn.addEventListener('click', () => {
    let searchValue = searchField.value.trim();
    if(!(searchValue === '' || searchValue === null)) {
        fetchAndDisplayWeather(searchValue);
        body.style.backgroundColor = colors[Math.floor(Math.random() * 10)];
    }
});

searchField.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        let searchValue = searchField.value.trim();
        if(!(searchValue === '' || searchValue === null)) {
            fetchAndDisplayWeather(searchValue);
            body.style.backgroundColor = colors[Math.floor(Math.random() * 10)];
        }
    }
});

body.style.backgroundColor = colors[Math.floor(Math.random() * 10)];



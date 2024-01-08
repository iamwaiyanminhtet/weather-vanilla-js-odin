// get lan&lon of given city name
async function getLatLon(name) {
    try {
        // call to openweatherapi geolocation
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=9b7e10f1bbaa419497f5ad30d54d6503`, {
            mode : "cors"
        });
        const data = await response.json();
        return data;
    }catch (error) {
        console.log(error);
    }
}

// get city photo
async function getCityInfo(id) {
    const response = await fetch(`https://api.teleport.org/api/cities/geonameid:${id}/`);
    const data = await response.json();
    return data;
}

// get weather data by city name
async function getWeatherData (name) {
   try {
    // get lat&lon
    const getCity = await getLatLon(name);
    const lat = getCity[0].lat;
    const lon = getCity[0].lon;

    // get weatherInfo
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=9b7e10f1bbaa419497f5ad30d54d6503`,{
        mode : "cors"
    });
    const data = response.json();
    return data;
   } catch (error) {
    console.log(error);
   }
}

//  img.src = `https://openweathermap.org/img/wn/${v.weather[0].icon}@2x.png`;

getWeatherData('Buffalo').then(v => console.log(v));


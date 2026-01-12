const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

let generateData = async(city)=>{
        let generatedData = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonGeneratedData = await generatedData.json();
        let weatherData = {
            name : jsonGeneratedData.name,
            country : jsonGeneratedData.sys.country,
            coord : jsonGeneratedData.coord,
            sea_level : jsonGeneratedData.main.sea_level,
            temp : jsonGeneratedData.main.temp,
            temp_max : jsonGeneratedData.main.temp_max,
            temp_min : jsonGeneratedData.main.temp_min,
            pressure : jsonGeneratedData.main.pressure,
            wind_deg : jsonGeneratedData.wind.deg,
            wind_gust : jsonGeneratedData.wind.gust,
            wind_speed : jsonGeneratedData.wind.speed,
            weather_main : jsonGeneratedData.weather[0].main,
            weather_description : jsonGeneratedData.weather[0].description,
        }
        return weatherData;
}

export default generateData;

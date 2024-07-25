const { DateTime } = require("luxon");

const API_KEY_ONECALL = "dbd3b02d8958d62185d02e944cd5f522"
const BASE_URL = "https://api.openweathermap.org/data/2.5"


const getWeatherdata = (infoType , searchParams,API_KEY) =>{
    const url = new URL( BASE_URL + "/" +infoType);
    url.search = new URLSearchParams({...searchParams,appid:API_KEY,units:"metric"})
      return fetch(url).then((res)=>res.json())

}

const formatCurrentweather = (data)=>{
    const {
        coord:{lat, lon},
        main:{temp,feels_like,temp_min,temp_max,humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed},
        timezone

    }=data;

    const {description:details , icon}=weather[0]

   return {lat, lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,sunset,details,icon,speed,timezone}
}

 const formatForcastWeather = (data)=>{
    let {timezone,daily,hourly}=data;
    daily = daily.slice(1,7).map(d=>{
        return{
            title: formatToLocalTime(d.dt ,timezone,"cccc"),
            temp:d.temp.day,
            icon:d.weather[0].icon
        }
    });
    hourly = hourly.slice(1,11).map(d=>{
        return{
            title: formatToLocalTime(d.dt ,timezone,"hh:mm a"),
            temp:d.temp,
            icon:d.weather[0].icon
        }
    });

    return{timezone,daily,hourly};
    
 }

const getFormattedWeatherData = async (searchParams)=>{
    const formattedCurrentWeather = await getWeatherdata('weather',searchParams,API_KEY_ONECALL).then(formatCurrentweather)
    const {lat,lon}=formattedCurrentWeather
    const formattedForcastWeather = await getWeatherdata('onecall',{lat,lon,exclude:'current,minutely,alerts',units:"metric"},API_KEY_ONECALL).then(formatForcastWeather);

    return{formattedCurrentWeather,formattedForcastWeather}

};

const formatToLocalTime = (secs,zone,format = "cccc, dd LLL yyyy'| Local time:'hh:mm a")=> DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
const iconUrlFromCode = (code)=> `http://openweathermap.org/img/wn/${code}@2x.png`
module.exports = {getFormattedWeatherData,formatToLocalTime,iconUrlFromCode};

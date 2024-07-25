var express = require("express");
var app = express();
var router = express.Router();
const React = require("react");
const { useEffect } = React;
const { useState } = React;
const weatherService = require("../public/weatherService");
const getFormattedWeatherData = weatherService.getFormattedWeatherData;
const formatToLocalTime = weatherService.formatToLocalTime;
const iconUrlFromCode = weatherService.iconUrlFromCode;
const formattedCurrentWeather = weatherService.getFormattedWeatherData.formattedCurrentWeather;
const { DateTime } = require("luxon");
const EventEmitter = require('events')
const event = new EventEmitter();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
var location = require("../templates/views/src");



/* GET home page. */
router.get("/", (req, res) => {
   
  const fetchweather = async () => {
    var cityname = req.query.city;
    console.log(cityname);
    if(cityname === undefined){
     cityname = "khordha"
    }
    var e = cityname.toString();
    const wetherdata = await getFormattedWeatherData({q:e});
    const data = await JSON.parse(JSON.stringify(wetherdata));
    return data;
  };
  const mypromise = new Promise((resolve, reject) => {
    const val = fetchweather();
    resolve(val);
  });
  const alldata = mypromise.then((value) => getvalue(value));

   
  
  
  function getvalue(z) {
    console.log("data has fetched");
    const temp = z.formattedCurrentWeather.temp;
    const temp_min = z.formattedCurrentWeather.temp_min;
    const temp_max = z.formattedCurrentWeather.temp_max;
    const country = z.formattedCurrentWeather.country;
    const sunrise = z.formattedCurrentWeather.sunrise;
    const sunset = z.formattedCurrentWeather.sunset;
    const details = z.formattedCurrentWeather.details;
    const icon = z.formattedCurrentWeather.icon;
    const name = z.formattedCurrentWeather.name;
    const dt = z.formattedCurrentWeather.dt;
    const timezone = z.formattedForcastWeather.timezone;
    const humidity = z.formattedCurrentWeather.humidity;
    
    const localtime = DateTime.fromSeconds(dt).setZone(timezone).toFormat("cccc, dd LLL yyyy '| Local time:' hh:mm a");
    const sunrisetime = DateTime.fromSeconds(sunrise).setZone(timezone).toFormat(" hh:mm a");
    const sunsettime = DateTime.fromSeconds(sunset).setZone(timezone).toFormat(" hh:mm a");
    const currentdata = {
      temp: temp,
      temp_min: temp_min,
      temp_max: temp_max,
      country: country,
      sunrise: sunrise,
      sunset: sunset,
      details: details,
      icon: icon,
      name: name,
      localtime:localtime,
      dt:dt,
      timezone:timezone,
      sunrisetime:sunrisetime,
      sunsettime:sunsettime,
      humidity:humidity
    };

    let weekday=[];
    let weeektemp=[];
    let weekicon=[],hourtime=[],hourlytemp=[],hourlyicon=[];
    // let day,daytemp;
     for(i=0;i<6;i++){
      weekday[i] = z.formattedForcastWeather.daily[i].title;
      weeektemp[i] = z.formattedForcastWeather.daily[i].temp;
      weekicon[i] = z.formattedForcastWeather.daily[i].icon;
     
      currentdata["day"+i]=weekday[i];
      currentdata["daytemp"+i]=weeektemp[i];
      currentdata["dayicon"+i]=weekicon[i];
     }
     for(i=0;i<10;i++){
      hourtime[i] = z.formattedForcastWeather.hourly[i].title;
      hourlytemp[i]=z.formattedForcastWeather.hourly[i].temp;
      hourlyicon[i]=z.formattedForcastWeather.hourly[i].icon;
      currentdata["hour"+i]=hourtime[i];
      currentdata["hourlytemp"+i]=hourlytemp[i];
      currentdata["hourlyicon"+i]=hourlyicon[i];
     }
    console.log(currentdata.humidity)
    res.render("index",currentdata);
  }
});

// router.post('/signup', (req, res) => {
//   var em = req.body.emailInput;
//   res.render('index', { title:'Netflix Clone', email:em });
// });

module.exports = router;

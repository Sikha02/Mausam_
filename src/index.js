const express= require('express');
const app=express();
const path = require("path");
const port =  8000;
const hbs = require('hbs');
const weatherService = require("../public/weatherService");
const getFormattedWeatherData = weatherService.getFormattedWeatherData;  
const homeRouter = require("../routes/home")
const bodyParser = require('body-parser')

const publicpath = path.join(__dirname,'../public')
const templatespath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','hbs');
app.set('views',templatespath);
app.use(express.static(publicpath));
hbs.registerPartials(partialspath)

// app.get("/",(req,res)=>{
//     res.render('index'); 
// });

app.use('/', homeRouter);

app.get("/map",(req,res)=>{
    res.render('map');
});
app.get('/about' , (req , res)=>{

   res.render('about');

})

// const fetchweather = async () =>{
//     const data = await getFormattedWeatherData({q:'pune'});
//     console.log(data);
// }
// fetchweather();

app.listen(port,console.log("server run at ",port))
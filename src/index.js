const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const hbs = require('hbs');
const weatherService = require('../public/weatherService');
const getFormattedWeatherData = weatherService.getFormattedWeatherData;
const homeRouter = require('../routes/home');
const bodyParser = require('body-parser');

// Define paths for Express
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));  // Serving static files from public directory

// View Engine Setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Routes
app.use('/', homeRouter);

app.get('/map', (req, res) => {
    res.render('map');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {
    const { username, password, branch } = req.body;
    // Handle login logic here
    if (branch === 'NDM') {
        res.redirect('/ndm');
    } else if (branch === 'SDM') {
        res.redirect('/sdm');
    } else {
        res.status(400).send('Invalid branch selection');
    }
});
app.get('/registration', (req, res) => { // Ensure this route exists
    console.log('Registration route hit'); 
    res.render('registration');
});

app.get('/ndm', (req, res) => {
    res.render('NDM');
});

app.get('/sdm', (req, res) => {
    res.render('SDM');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

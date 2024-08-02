const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const hbs = require('hbs');
const cors = require('cors');
const weatherService = require('../public/weatherService');
const getFormattedWeatherData = weatherService.getFormattedWeatherData;
const homeRouter = require('../routes/home');
const bodyParser = require('body-parser');
const collection = require('./moongodb');

// Define paths for Express
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));  // Serving static files from public directory
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  LogInCollection.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: 'Error logging in' });
    }
    if (!user) {
      return res.status(401).send({ message: 'Invalid username' });
    }
    if (user.branch !== branch) {
      return res.status(401).send({ message: 'Invalid branch' });
    }
    const isValidPassword = user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    // Return a success response, e.g., a JSON Web Token (JWT)
    res.send({ message: 'Login successful' });
  });
});

app.get('/registration', (req, res) => {
    console.log('Registration route hit'); 
    res.render('registration');
});

app.post('/registration', async (req, res) => {
    const { username, email, password, branch } = req.body;
    console.log('Received data:', req.body);  
    try {
        const user = new collection({
            username,
            email,
            password,
            branch
        });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/ndm', (req, res) => {
    res.render('NDM');
});

app.get('/sdm', (req, res) => {
    res.render('SDM');
});

app.get('/Details', (req, res) => {
    res.render('Details');
});

app.get('/request', (req, res) => {
    res.render('request');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

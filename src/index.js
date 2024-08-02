const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const hbs = require('hbs');
const bodyParser = require('body-parser');
const { LogInCollection } = require('./moongodb'); // Ensure correct import

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
app.use('/', require('../routes/home'));

app.get('/map', (req, res) => {
    res.render('map');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/logout', (req, res) => {
    // Clear the user's session or authentication cookies
    req.logout((err) => {
      if (err) return next(err);
      res.redirect('/'); // Redirect to home page after logout
    });
  });
app.post('/login', async (req, res) => {
    const { username, password, branch } = req.body;
    try {
        const user = await LogInCollection.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid username');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send('Invalid password');
        }

        if (user.branch !== branch) {
            return res.status(401).send('Invalid branch');
        }

        // Redirect based on branch
        if (branch === 'NDM') {
            res.redirect('/ndm');
        } else if (branch === 'SDM') {
            res.redirect('/sdm');
        } else {
            res.status(400).send('Invalid branch selection');
        }
    } catch (error) {
        console.error('Login error:', error); // Debugging
        res.status(500).send('Internal Server Error');
    }
});


app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', async (req, res) => {
    const { username, email, password, branch } = req.body;
    try {
        const user = new LogInCollection({
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

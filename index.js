require('dotenv/config');
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const hbs = require('express-handlebars');
const db = require('./config/database/connection');
const PORT = process.env.PORT;
const APODRouter = require('./routes/apod');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db connection
db.connect((err) => {
    if (err) console.log('connction error', err);
    else console.log('Database connected 💯💯💯');
});

// routers
app.use('/', APODRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
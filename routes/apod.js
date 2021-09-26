const router = require('express').Router();
const APODController = require('../controllers/apod.js');

// Home page
router.get('/', (req, res) => {
    res.render('index', { title: 'APOD' });
});

// Get APOD image for today
router.get('/today', APODController.getTodayAPODImage);

//Get APOD image for a specific date
router.get('/search/:date', APODController.getAPODImageForDate);

module.exports = router;
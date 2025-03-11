var express = require('express');
var router = express.Router();
var controller = require('../controllers/booking')

/* GET home page. */
router.get('/read',controller.readBooking);
router.post('/create',controller.createBooking);

module.exports = router;

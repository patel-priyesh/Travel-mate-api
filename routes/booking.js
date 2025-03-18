var express = require('express');
var router = express.Router();
var controller = require('../controllers/booking')

/* GET home page. */
router.get('/read',controller.readBooking);
router.post('/create',controller.createBooking);
router.patch('/update/:id',controller.updateBooking);
router.delete('/cancle/:id'),controller.deleteBooking;

module.exports = router;

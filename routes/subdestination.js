var express = require('express');
var router = express.Router();
let controller = require('../controllers/subdestination')

/* GET home page. */
router.get('/read',controller.read);
router.post('/create',controller.create);
router.patch('/update/:id',controller.update);
router.delete('/delete/:id',controller.delete);

module.exports = router;

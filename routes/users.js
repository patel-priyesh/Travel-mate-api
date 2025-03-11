var express = require('express');
var router = express.Router();
let controller = require('../controllers/user')


router.get('/read',controller.read);
router.post('/create',controller.create);
router.post('/login',controller.login);
router.patch('/update/:id',controller.update);
router.delete('/delete/:id',controller.delete);

module.exports = router;

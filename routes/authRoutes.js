const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/postData', authController.postAuth);
router.get('/getAll', authController.getAuth);
router.post('/login', authController.login);
router.post('/checkUser', authController.checkUser);



module.exports = router;
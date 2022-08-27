const express = require('express');
const router = express.Router();

const serverController = require('../controllers/serverController');

router.get('/', serverController.getAll);



module.exports = router;
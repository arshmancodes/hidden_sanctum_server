const express = require('express');
const router = express.Router();

const serverController = require('../controllers/serverController');


router.post('/addServer', serverController.postServer); // BASEURL+/server+/addServer
router.get('/getAll', serverController.getAll);
router.get('/paidServers', serverController.paidServers);
router.get('/freeServers', serverController.freeServers);



module.exports = router;
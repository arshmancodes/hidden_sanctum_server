const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.get('/getPackages', packageController.viewPackage);
router.post('/postPackage', packageController.postPackage);
router.post('/updatePackage', packageController.updatePackage);
router.post('/deletePackage', packageController.deletePackage);

module.exports = router;
const express = require('express');
const router = express.Router();
const paymentsContoller = require('../controllers/paymentsController');


router.get('/getPayments', paymentsContoller.viewPaymentData);
router.post('/postPayment', paymentsContoller.postPayment);
router.post('/updatePayment', paymentsContoller.updatePayment);
router.post('/deletePayment', paymentsContoller.deletePayment);


module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/checkout.controller');

router.post('/', controller.index);

router.post('/order', controller.orderPost);
 router.get('/order/success/:order_id', controller.success);

// router.get('/delete/:product_id', controller.delete);
// router.post('/delete-all', controller.deleteAll);


module.exports = router;
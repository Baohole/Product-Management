const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/products.controller');

router.get('/', controller.index);
router.get('/:slugCategory', controller.prouctByCategory);
router.get('/detail/:slugProduct', controller.prouctDetail);

module.exports = router;
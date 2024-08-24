const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/chat.controller');

router.get('/', controller.index);

// router.post('/add/:id', controller.addPost);
// router.get('/update/:product_id/:quantity', controller.update);

// router.get('/delete/:product_id', controller.delete);
// router.post('/delete-all', controller.deleteAll);


module.exports = router;
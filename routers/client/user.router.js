const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/user.controller');

router.get('/login', controller.login);
router.post('/login', controller.loginPost);

router.post('/register', controller.registerPost);
router.get('/logout', controller.logout);

// router.get('/delete/:product_id', controller.delete);
// router.post('/delete-all', controller.deleteAll);


module.exports = router;
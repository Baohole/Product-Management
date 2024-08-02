const express = require('express');
const router = express.Router();


const controller = require('../../controllers/admin/accounts.controller');
const multer  = require('multer');
const upload = multer();

const cloudUpload = require('../../middleware/upload.middleware');

router.get('/', controller.index);

router.get('/create', controller.createAccount);
router.post('/create', upload.single('avatar'), cloudUpload.cloudUpload, controller.createAccountPost);

router.get('/edit/:id', controller.editAccount);
router.patch('/edit/:id', upload.single('avatar'), cloudUpload.cloudUpload, controller.editAccountPatch);

module.exports = router;

const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer();
const controller = require('../../controllers/admin/categories.controller');
const validate = require('../../validate/admin/product.validate');

router.get('/', controller.index);

router.get('/create', controller.creatCategory);
router.post('/create', upload.single('thumbnail'), validate.validateTitle, controller.creatCategoryPost);


module.exports = router;
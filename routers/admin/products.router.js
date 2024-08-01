const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/products.controller');
const validate = require('../../validate/admin/product.validate');


const cloudUpload = require('../../middleware/upload.middleware');
const multer  = require('multer');
const upload = multer();

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMultiStatus);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.createProduct);
router.post('/create', upload.single('thumbnail'), validate.validateTitle, cloudUpload.cloudUpload, controller.createProductPost);

router.get('/edit/:id', controller.editProduct);
router.patch('/edit/:id', upload.single('thumbnail'), validate.validateTitle, cloudUpload.cloudUpload, controller.editProductPatch);

//router.get('/:slug', controller.productDetail);
module.exports = router;
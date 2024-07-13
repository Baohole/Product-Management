const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const controller = require('../../controllers/admin/products.controller');
const validate = require('../../validate/admin/product.validate');
router.get('/', controller.index);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMultiStatus);
router.delete('/delete/:id', controller.deleteItem);
router.get('/create', upload.single('thumbnail'), controller.createProduct);
router.post('/create', validate.validateTitle, controller.createProductPost);
router.get('/edit/:id', controller.editProduct);
router.patch('/edit/:id', validate.validateTitle, controller.editProductPatch);
module.exports = router;
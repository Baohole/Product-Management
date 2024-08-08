const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer();

const cloudUpload = require('../../middleware/admin/upload.middleware');

const controller = require('../../controllers/admin/categories.controller');
const validate = require('../../validate/admin/product.validate');

router.get('/', controller.index);

router.get('/create', controller.creatCategory);
router.post('/create', upload.single('thumbnail'), validate.validateTitle, controller.creatCategoryPost);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMultiStatus);

router.delete('/delete/:id', controller.deleteItem);

router.get('/edit/:id', controller.editCategory);
router.patch('/edit/:id', upload.single('thumbnail'), validate.validateTitle, controller.editCategoryPatch);

router.get('/:id', controller.categoryDetail);

module.exports = router;
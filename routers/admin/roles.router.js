const express = require('express');
const router = express.Router();


const controller = require('../../controllers/admin/roles.controller');

const validate = require('../../validate/admin/product.validate');
router.get('/', controller.index);

router.get('/create', controller.creatRole);
router.post('/create', validate.validateTitle, controller.creatRolePost);

router.get('/permissions', controller.permission);
router.patch('/permissions', controller.permissionPatch);

module.exports = router;
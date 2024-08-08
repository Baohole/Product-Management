const express = require('express');
const router = express.Router();


const controller = require('../../controllers/admin/roles.controller');

const validate = require('../../validate/admin/product.validate');
router.get('/', controller.index);

router.get('/create', controller.creatRole);
router.post('/create', validate.validateTitle, controller.creatRolePost);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/permissions', controller.permission);
router.patch('/permissions', controller.permissionPatch);

router.get('/edit/:id', controller.editRole);
router.patch('/edit/:id', controller.editRolePatch);

router.get('/:id', controller.roleDetail);

module.exports = router;
const router=require('express').Router()
const rolePermissionController=require('../controllers/rolePermissionController')

router.get('/user/:id',rolePermissionController.getAllPermissionByUserId)
router.post('/',rolePermissionController.addRoleWithPermission)
router.put('/:roleId',rolePermissionController.editRoleWithPermission)
router.delete('/:roleId',rolePermissionController.deleteRoleWithPermission)
router.get('/permissions',rolePermissionController.getAllPermission)
router.get('/',rolePermissionController.getAllRolePermission)


module.exports = router;
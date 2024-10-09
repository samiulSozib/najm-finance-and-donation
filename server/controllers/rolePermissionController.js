const rolePermissionService=require('../services/rolePermissionService')

// Get all permission by user id
exports.getAllPermissionByUserId = async (req, res) => {
    const userId=req.params.id
    try {
        const permissions = await rolePermissionService.getAllPermissionByUserId({userId});
        console.log(permissions)
        return res.status(200).json({
            status: true,
            data: permissions,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get all permission
exports.getAllPermission = async (req, res) => {
    
    try {
        const permissions = await rolePermissionService.getAllPermission();
     
        return res.status(200).json({
            status: true,
            data: permissions,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get all role permission
exports.getAllRolePermission = async (req, res) => {
    
    try {
        const rolePermissions = await rolePermissionService.getAllRolePermission();
     
        return res.status(200).json({
            status: true,
            data: rolePermissions,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.addRoleWithPermission = async (req, res) => {
    const { name, description, permissions } = req.body;

    try {
        const newRole = await rolePermissionService.createRoleWithPermissions({ name, description, permissions });

        res.status(201).json({
            status:true,
            message: 'Role created successfully!',
            data: newRole
        });
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message,
        });
    }
};


exports.editRoleWithPermission = async (req, res) => {
    const { roleId } = req.params;
    const { name, description, permissions } = req.body;

    try {
        // Call the service function to edit the role and permissions
        const updatedRole = await rolePermissionService.editRoleWithPermissions(roleId, {
            name,
            description,
            permissions
        });

        // Send the updated role data in the response
        res.status(200).json({
            message: 'Role and permissions updated successfully',
            data: updatedRole
        });
    } catch (error) {
        console.error('Error in editRoleController:', error);

        // Return a 500 status code for server errors
        res.status(500).json({
            message: 'Failed to update role and permissions',
            error: error.message
        });
    }
};


exports.deleteRoleWithPermission = async (req, res) => {
    const { roleId } = req.params; // Extract roleId from request parameters

    try {
        // Call the service function to delete the role and its permissions
        const deletedRole = await rolePermissionService.deleteRoleWithPermissions(roleId);

        if (deletedRole) {
            return res.status(200).json({
                message: 'Role and associated permissions deleted successfully',
            });
        } else {
            return res.status(404).json({
                message: 'Role not found',
            });
        }
    } catch (error) {
        console.error('Error in deleteRoleController:', error);

        return res.status(500).json({
            message: 'Failed to delete role and permissions',
            error: error.message,
        });
    }
};
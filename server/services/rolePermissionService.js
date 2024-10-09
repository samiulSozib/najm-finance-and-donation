const db = require('../database/db');


// Get all permission by user id
const getAllPermissionByUserId = async ({userId}) => {
   
    try {
        return await db.Role.findAll({
            include: [
              {
                model: db.UserRole,
                where: { user_id: userId }, // filter by user_id
                attributes: [] // exclude UserRole attributes
              },
              {
                model: db.Permission, // include permissions associated with the role
                through: { attributes: [] }, // exclude RolePermission attributes (if you have a many-to-many relationship)
              }
            ]
          });
    } catch (error) {
        throw error;
    }
};

// Get all permission 
const getAllPermission = async () => {
   
    try {
        return await db.Permission.findAll();
    } catch (error) {
        throw error;
    }
};

// Get all role with permission 
const getAllRolePermission = async () => {
   
    try {
        return await db.Role.findAll({include:[{model:db.Permission}]});
    } catch (error) {
        throw error;
    }
};

// add role and permission
const createRoleWithPermissions = async ({name, description, permissions}) => {
    const transaction = await db.sequelize.transaction();  // Start a transaction

    try {
        // Step 1: Create the role inside the transaction
        const newRole = await db.Role.create({
            name,
            description
        }, { transaction });

        console.log(typeof(permissions))
        // Step 2: Add role_permissions inside the same transaction
        const rolePermissionsData = permissions.map(permission_id => ({
            role_id: newRole.id,
            permission_id: permission_id
        }));
       

        await db.RolePermission.bulkCreate(rolePermissionsData, { transaction });

        const roleData=await db.Role.findByPk(newRole.id,{include:[{model:db.Permission}],transaction})

        // Commit the transaction if everything is successful
        await transaction.commit();

        return roleData;
    } catch (error) {
        // Rollback the transaction in case of any error
        await transaction.rollback();
        console.error('Error creating role with permissions:', error);
        throw error;
    }
};


// Edit role and permissions
const editRoleWithPermissions = async (roleId, {name, description, permissions}) => {
    const transaction = await db.sequelize.transaction();  // Start a transaction

    try {
        // Step 1: Find the role by ID
        const role = await db.Role.findByPk(roleId, { transaction });

        if (!role) {
            throw new Error('Role not found');
        }

        // Step 2: Update the role details inside the transaction
        await role.update({
            name,
            description
        }, { transaction });

        // Step 3: Delete existing role-permission associations
        await db.RolePermission.destroy({
            where: { role_id: roleId },
            transaction
        });

        

        // Step 5: Add new role-permission associations
        const rolePermissionsData = permissions.map(permission_id => ({
            role_id: roleId,
            permission_id: permission_id
        }));

        await db.RolePermission.bulkCreate(rolePermissionsData, { transaction });

        // Step 6: Fetch and return the updated role with associated permissions
        const updatedRole = await db.Role.findByPk(roleId, {
            include: [{ model: db.Permission }],
            transaction
        });

        // Commit the transaction if everything is successful
        await transaction.commit();

        return updatedRole;
    } catch (error) {
        // Rollback the transaction in case of any error
        await transaction.rollback();
        console.error('Error editing role with permissions:', error);
        throw error;
    }
};


// delete role and permission

const deleteRoleWithPermissions = async (roleId) => {
    const transaction = await db.sequelize.transaction(); // Start a transaction

    try {
        // Step 1: Delete the role permissions
        await db.RolePermission.destroy({
            where: { role_id: roleId },
            transaction,
        });

        // Step 2: Delete the role itself
        const deletedRole = await db.Role.destroy({
            where: { id: roleId },
            transaction,
        });

        // Commit the transaction
        await transaction.commit();

        return deletedRole; // Return the deleted role count or any other relevant data
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        throw error; // Throw the error to be handled in the controller
    }
};




module.exports = {
    getAllPermissionByUserId,
    getAllPermission,
    getAllRolePermission,
    createRoleWithPermissions,
    editRoleWithPermissions,
    deleteRoleWithPermissions
};


// {
//     name:"role_name",
//     description:"description_name",
//     permission:{1,2,3}
// }
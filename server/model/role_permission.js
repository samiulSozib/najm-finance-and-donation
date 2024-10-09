module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define('RolePermission', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            
        },
        permission_id: {
            type: DataTypes.INTEGER,
            
        }
    }, {
        timestamps: true,
        tableName: 'role_permissions',
    });

    return RolePermission;
};

module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: true,
        tableName: 'user_roles'
    });

    return UserRole;
};

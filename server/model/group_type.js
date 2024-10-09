module.exports = (sequelize, DataTypes) => {
    const GroupType = sequelize.define('GroupType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.CHAR(255),
            allowNull: false
        },
    }, {
        timestamps: true,
        tableName: 'group_types'
    });

    return GroupType;
};

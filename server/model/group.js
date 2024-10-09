module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        leader_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
        group_type:{
            type:DataTypes.INTEGER
        }
    }, {
        timestamps: true,
        tableName: 'groups'
    });

    return Group;
};

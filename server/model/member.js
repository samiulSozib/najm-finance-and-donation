module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        occupation: {
            type: DataTypes.STRING
        },
        monthly_contribution: {
            type: DataTypes.DECIMAL(10, 2)
        },
        address: {
            type: DataTypes.STRING
        },
        joining_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        group_id: {
            type: DataTypes.INTEGER,
            
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive')
        },
        member_type:{
            type:DataTypes.ENUM('member','leader')
        }
    }, {
        timestamps: true,
        tableName: 'members'
    });

    return Member;
};

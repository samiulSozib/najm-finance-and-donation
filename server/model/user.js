module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
        is_verified:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
    }, {
        timestamps: true,
        tableName: 'users'
    });

    return User;
};

module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('Language', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.CHAR(60) ,
            
        },
        iso_code: {
            type: DataTypes.CHAR(10) 
        },
    }, {
        timestamps: true,
        tableName: 'language'
    });

    return Language;
};

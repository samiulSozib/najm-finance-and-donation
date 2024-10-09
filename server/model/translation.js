
module.exports = (sequelize, DataTypes) => {
    const Translation = sequelize.define('Translation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        translation_key : {
            type: DataTypes.CHAR(255) ,
            
        },
        translation_value : {
            type: DataTypes.CHAR(255) 
        },
        language_id:{
            type:DataTypes.INTEGER
        }
    }, {
        timestamps: true,
        tableName: 'translations'
    });

    return Translation;
};

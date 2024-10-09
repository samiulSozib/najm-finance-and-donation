module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        start_date: {
            type: DataTypes.DATE
        },
        end_date: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: true,
        tableName: 'events'
    });

    return Event;
};

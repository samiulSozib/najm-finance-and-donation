module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        admin_id: {
            type: DataTypes.INTEGER,
            
        },
        event_id: {
            type: DataTypes.INTEGER,
            
        },
        category: {
            type: DataTypes.INTEGER,
            
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'expenses'
    });

    return Expense;
};

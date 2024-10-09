module.exports = (sequelize, DataTypes) => {
    const ExpenseCategory = sequelize.define('ExpenseCategory', {
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
        }
    }, {
        timestamps: true,
        tableName: 'expense_categories'
    });

    return ExpenseCategory;
};

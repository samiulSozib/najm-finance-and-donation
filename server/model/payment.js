module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        member_id: {
            type: DataTypes.INTEGER,
            
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        payment_type: {
            type: DataTypes.ENUM('monthly', 'event', 'voluntary'),
            allowNull: false
        },
        event_id: {
            type: DataTypes.INTEGER,
            
        },
        status: {
            type: DataTypes.ENUM('paid', 'unpaid', 'pending')
        }
    }, {
        timestamps: true,
        tableName: 'payments'
    });

    return Payment;
};

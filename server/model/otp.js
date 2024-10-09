module.exports = (sequelize, DataTypes) => {
    const OTP = sequelize.define('OTP', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            
        },
        otp: {
            type: DataTypes.INTEGER
        },
        daily_otp_count: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: true,
        tableName: 'otp'
    });

    return OTP;
};

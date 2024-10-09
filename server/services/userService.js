const db = require('../database/db');

// Get all Users, excluding the password field
const getAllUser = async () => {
    try {
        return await db.User.findAll({
            attributes: { exclude: ['password'] } // Exclude password field
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUser
};
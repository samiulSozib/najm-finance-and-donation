const db = require('../database/db');

// Create a new GroupType
const createGroupType = async ({ name }) => {
    const transaction = await db.sequelize.transaction();
    try {
        const newGroupType = await db.GroupType.create({ name }, { transaction });
        await transaction.commit();
        return newGroupType;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Update a GroupType by ID
const updateGroupType = async (groupTypeId, { name }) => {
    const transaction = await db.sequelize.transaction();
    try {
        const groupType = await db.GroupType.findByPk(groupTypeId, { transaction });
        if (!groupType) {
            throw new Error('GroupType not found');
        }

        await db.GroupType.update({ name }, {
            where: { id: groupTypeId },
            transaction
        });

        const updatedGroupType = await db.GroupType.findByPk(groupTypeId, { transaction });
        await transaction.commit();
        return updatedGroupType;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Delete a GroupType by ID
const deleteGroupType = async (groupTypeId) => {
    const transaction = await db.sequelize.transaction();
    try {
        const groupType = await db.GroupType.findByPk(groupTypeId, { transaction });
        if (!groupType) {
            throw new Error('GroupType not found');
        }

        await db.GroupType.destroy({
            where: { id: groupTypeId },
            transaction
        });

        await transaction.commit();
        return { message: 'GroupType deleted successfully' };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Get all GroupTypes with pagination
const getAllGroupTypes = async (page, item_per_page = null) => {
    // If no pagination information is provided, return all group types
    if (!page || !item_per_page) {
        try {
            return await db.GroupType.findAndCountAll();
        } catch (error) {
            throw error;
        }
    }

    const offset = (page - 1) * item_per_page;

    try {
        return await db.GroupType.findAndCountAll({
            limit: item_per_page,
            offset: offset
        });
    } catch (error) {
        throw error;
    }
};


// Get GroupType by ID
const getGroupTypeById = async (groupTypeId) => {
    try {
        const groupType = await db.GroupType.findByPk(groupTypeId);
        if (!groupType) {
            throw new Error('GroupType not found');
        }
        return groupType;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createGroupType,
    updateGroupType,
    deleteGroupType,
    getAllGroupTypes,
    getGroupTypeById
};

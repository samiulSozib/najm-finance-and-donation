const db = require('../database/db');

// Create a new Group
const createGroup = async ({ name, description, group_type }) => {
    const transaction = await db.sequelize.transaction();
    try {
        // const leader = await db.Member.findByPk(leader_id, { transaction });
        // if (!leader) {
        //     throw new Error('Leader not found');
        // }

        const newGroup = await db.Group.create({
            name,
            description,
            group_type
        }, { transaction });

       

        const createdGroup = await db.Group.findByPk(newGroup.id, {
            include: [
                {model:db.GroupType},
                { model: db.Member }
            ],
            transaction
        });

        await transaction.commit();
        return createdGroup;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Update an existing Group
// Update an existing Group
const updateGroup = async (groupId, { name, description, leader_id, group_type }) => {
    const transaction = await db.sequelize.transaction();
    try {
        // Find the group with its current leader
        const group = await db.Group.findByPk(groupId, {
            include: [{ model: db.Member }],
            transaction
        });

        if (!group) {
            throw new Error('Group not found');
        }

        // Check if the current leader is different from the new leader_id
        const currentLeaderId = group.leader_id;
        if (currentLeaderId !== leader_id) {
            // If a leader change is happening, update the previous leader's role to 'member'
            if (currentLeaderId) {
                await db.Member.update({
                    member_type: 'member'
                }, {
                    where: { id: currentLeaderId },
                    transaction
                });
            }

            // Set the new leader's role to 'leader'
            await db.Member.update({
                member_type: 'leader'
            }, {
                where: { id: leader_id },
                transaction
            });
        }

        // Update the group with new values
        await db.Group.update({
            name,
            description,
            leader_id,
            group_type
        }, {
            where: { id: groupId },
            transaction
        });

        // Fetch the updated group with its associated data
        const updatedGroup = await db.Group.findByPk(groupId, {
            include: [
                { model: db.GroupType },
                { model: db.Member }
            ],
            transaction
        });

        // Commit the transaction if everything is successful
        await transaction.commit();
        return updatedGroup;

    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        throw error;
    }
};


// Delete an Group
const deleteGroup = async (groupId) => {
    const transaction = await db.sequelize.transaction();
    try {
        const group = await db.Group.findByPk(groupId, { transaction });
        if (!group) {
            throw new Error('Group not found');
        }

        await db.Group.destroy({
            where: { id: groupId },
            transaction
        });

        await transaction.commit();
        return { message: 'Group deleted successfully' };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

//Get all Groups by group_type
const getAllGroupsByGroupType = async (page, item_per_page = null, group_type = null) => {
    // If no pagination information is provided, return all groups of the specified group_type
    if (!page || !item_per_page) {
        try {
            return await db.Group.findAndCountAll({
                where: group_type ? { group_type: group_type } : {},
                include: [
                    { model: db.GroupType },
                    { model: db.Member }
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    const offset = (page - 1) * item_per_page;

    // Build the query options
    const queryOptions = {
        include: [
            { model: db.GroupType },
            { model: db.Member }
        ],
        limit: item_per_page,
        offset
    };

    // Add group_type to where clause if provided
    if (group_type) {
        queryOptions.where = {
            group_type: group_type
        };
    }

    try {
        const groups = await db.Group.findAndCountAll(queryOptions);
        return groups;
    } catch (error) {
        throw error;
    }
};


// Get a Group by ID
const getGroupById = async (groupId) => {
    try {
        const group = await db.Group.findByPk(groupId, {
            include:[
                {model:db.GroupType},
                { model: db.Member }
            ]
        });

        if (!group) {
            throw new Error('Group not found');
        }

        return group;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createGroup,
    updateGroup,
    deleteGroup,
    getAllGroupsByGroupType,
    getGroupById
};

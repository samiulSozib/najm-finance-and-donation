const db = require('../database/db');
const bcrypt = require('bcrypt');
const moment =require('moment')
const { Op } = require('sequelize');


// Create a new member
const createMember = async ({ username,email,name, occupation, monthly_contribution, address, joining_date, group_id }) => {
    const transaction = await db.sequelize.transaction();
    try {
        // Check if Usra exists               group_id
        const group = await db.Group.findByPk(group_id, { transaction });
        if (!group) {
            throw new Error('Group not found');
        }

        // create a new user 
        const hashPassword=await bcrypt.hash(username,10)
        const defaultRole = await db.Role.findOne({
            where: { name: 'member' },
            transaction
        });

        if (!defaultRole) {
            throw new Error('Default role not found');
        }

        const newUser=await db.User.create({
            username,
            email,
            password: hashPassword,
            is_verified: 1
        },{transaction})

        await db.UserRole.create({
            user_id:newUser.id,
            role_id:defaultRole.id
        ,},{transaction})

        // Create the new member
        const newMember = await db.Member.create({
            user_id:newUser.id,
            name,
            occupation,
            monthly_contribution,
            address,
            joining_date,
            group_id,
            status:"active",
            member_type:'member'
        }, { transaction });


        const member=await db.Member.findByPk(newMember.id,{
            include:[
                {
                    model:db.User,
                    attributes: { exclude: ['password'] }
                },
               {
                    model:db.Group
               }
            ],
            transaction
        })
        

        await transaction.commit();
        return member;
    } catch (error) {
       
        await transaction.rollback();
        throw error;
    }
};

// Update an existing member
const updateMember = async (memberId, { name, occupation, monthly_contribution, address, joining_date, group_id }) => {
    const transaction = await db.sequelize.transaction();
    try {
        // Check if member exists
        const member = await db.Member.findByPk(memberId, { transaction });
        if (!member) {
            throw new Error('Member not found');
        }

        // Check if Usra exists (if provided)
        if (group_id) {
            const group = await db.Group.findByPk(group_id, { transaction });
            if (!group) {
                throw new Error('Group not found');
            }
        }

        // Update member details
        await db.Member.update({
            name,
            occupation,
            monthly_contribution,
            address,
            joining_date,
            group_id,
        }, {
            where: { id: memberId },
            transaction
        });

        const updatedMember = await db.Member.findByPk(memberId, {
            include:[
                {
                    model:db.User,
                    attributes: { exclude: ['password'] }
                },
               {
                    model:db.Group
               }
            ],
            transaction
        });

        await transaction.commit();
        return updatedMember;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Delete a member
const deleteMember = async (memberId) => {
    const transaction = await db.sequelize.transaction();
    try {
        // Check if member exists
        const member = await db.Member.findByPk(memberId, { transaction });
        if (!member) {
            throw new Error('Member not found');
        }

        await db.Member.destroy({
            where: { id: memberId },
            transaction
        });

        await transaction.commit();
        return { message: 'Member deleted successfully' };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Get all members (with pagination and optional)
const getAllMembers = async (page, item_per_page = null, group_id = null) => {
   
    if (!page || !item_per_page) {
     
        return await db.Member.findAndCountAll({
            include: [
                {
                    model: db.User,
                    attributes: { exclude: ['password'] }
                },
                {
                    model: db.Group
                }
            ],
            where: group_id ? { group_id: group_id } : {}, 
        });
    }

    const offset = (page - 1) * item_per_page;

    // Build the query options
    const queryOptions = {
        include: [
            {
                model: db.User,
                attributes: { exclude: ['password'] }
            },
            {
                model: db.Group
            }
        ],
        limit: item_per_page,
        offset
    };

   
    if (group_id) {
        queryOptions.where = {
            group_id: group_id
        };
    }

    try {
        const members = await db.Member.findAndCountAll(queryOptions);
        return members;
    } catch (error) {
        throw error;
    }
};


// Get a member by ID
const getMemberById = async (memberId) => {
    try {
        const member = await db.Member.findByPk(memberId, {
            include:[
                {
                    model:db.User,
                    attributes: { exclude: ['password'] }
                },
               {
                    model:db.Group
               }
            ],
        });

        if (!member) {
            throw new Error('Member not found');
        }

        return member;
    } catch (error) {
        throw error;
    }
};


const getMembersWithoutPaymentsForCurrentMonth = async (page = null, item_per_page = null) => {
    

    const queryOptions = {
        include: [
            {
            model: db.Payment,
            required: false, // This makes it a LEFT JOIN
            
            },
            {
                model:db.User,
                required:false
            },
            {
                model:db.Group,
                require:false
            }
        ]
    };

    // Pagination logic
    if (page && item_per_page) {
        const offset = (page - 1) * item_per_page;
        queryOptions.limit = item_per_page;
        queryOptions.offset = offset;
    }

    try {
        const members = await db.Member.findAndCountAll(queryOptions);
      
        return members;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

module.exports = {
    createMember,
    updateMember,
    deleteMember,
    getAllMembers,
    getMemberById,
    getMembersWithoutPaymentsForCurrentMonth
};

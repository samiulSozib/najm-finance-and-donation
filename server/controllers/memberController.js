const memberService = require('../services/memberService');
const { Op } = require('sequelize');
const moment =require('moment')


// Create a new member
exports.createMember = async (req, res) => {
    const { username,email, name, occupation, monthly_contribution, address, joining_date, group_id } = req.body;

    try {
        const newMember = await memberService.createMember({
            username,
            email,
            name,
            occupation,
            monthly_contribution,
            address,
            joining_date,
            group_id
            
        });
        return res.status(201).json({
            status: true,
            message: 'Member created successfully',
            data: newMember
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Update an existing member
exports.updateMember = async (req, res) => {
    const memberId = req.params.id;
    const { name, occupation, monthly_contribution, address, joining_date, group_id } = req.body;

    try {
        const updatedMember = await memberService.updateMember(memberId, {
            name,
            occupation,
            monthly_contribution,
            address,
            joining_date,
            group_id
        });
        return res.status(200).json({
            status: true,
            message: 'Member updated successfully',
            data: updatedMember
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Delete a member
exports.deleteMember = async (req, res) => {
    const memberId = req.params.id;

    try {
        await memberService.deleteMember(memberId);
        return res.status(200).json({
            status: true,
            message: 'Member deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get all members with optional Usra filter and pagination

exports.getAllMembers = async (req, res) => {
    const page = parseInt(req.query.page) || null;
    const item_per_page = parseInt(req.query.item_per_page) || null;
    const group_id = req.query.group_id || null; 

    try {
     
        const members = await memberService.getAllMembers(page, item_per_page, group_id);
        const total_pages = item_per_page ? Math.ceil(members.count / item_per_page) : 1;

        return res.status(200).json({
            status: true,
            data: members.rows,
            payload: {
                pagination: {
                    current_page: page || 1, 
                    per_page: item_per_page || members.count,
                    total_items: members.count,
                    total_pages: total_pages
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};


// Get a member by ID
exports.getMemberById = async (req, res) => {
    const memberId = req.params.id;

    try {
        const member = await memberService.getMemberById(memberId);
        return res.status(200).json({
            status: true,
            data: member
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};



exports.getMembersWithoutPaymentsForCurrentMonth = async (req, res) => {
    const page = parseInt(req.query.page) || null;
    const item_per_page = parseInt(req.query.item_per_page) || null;
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();
    
    try {
        const members = await memberService.getMembersWithoutPaymentsForCurrentMonth(page, item_per_page);
        const total_pages = item_per_page ? Math.ceil(members.count / item_per_page) : 1;
        const data=members.rows
        const membersWithoutPayments = data.filter(member => {
            const payments = member.Payments; // Assuming Payments is the association name
            return !payments || !payments.some(payment => {
                return moment(payment.payment_date).isBetween(startOfMonth, endOfMonth, null, '[]'); // Check if payment date is within current month
            });
        });
        // return res.json(membersWithoutPayments)
        return res.status(200).json({
            status: true,
            data: membersWithoutPayments,
            payload: {
                pagination: {
                    current_page: page || 1,
                    per_page: item_per_page || members.count,
                    total_items: members.count,
                    total_pages: total_pages
                }
            }
        });
        
    } catch (error) {
        
        return res.status(500).json({
            status: false,
            message: error
        });
    }
};
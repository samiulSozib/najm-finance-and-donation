const groupService = require('../services/groupServices');

// Create a new Group
exports.createGroup = async (req, res) => {
    const { name, description,group_type } = req.body;

    try {
        const newGroup = await groupService.createGroup({
            name,
            description,
            group_type
        });
        return res.status(201).json({
            status: true,
            message: 'Group created successfully',
            data: newGroup
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Update a Group by ID
exports.updateGroup = async (req, res) => {
    const groupId = req.params.id;
    const { name, description, leader_id,group_type } = req.body;

    try {
        const updatedGroup = await groupService.updateGroup(groupId, {
            name,
            description,
            leader_id,
            group_type
        });
        
        return res.status(200).json({
            status: true,
            message: 'Group updated successfully',
            data: updatedGroup
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Delete a Group by ID
exports.deleteGroup = async (req, res) => {
    const groupId = req.params.id;

    try {
        await groupService.deleteGroup(groupId);
        return res.status(200).json({
            status: true,
            message: 'Group deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// // Get all Groups By GroupType
exports.getAllGroupsByGroupType = async (req, res) => {
    const group_type=req.query.group_type||null
    const page = parseInt(req.query.page) || null;
    const item_per_page = parseInt(req.query.item_per_page) || null;
    try {
        const groups = await groupService.getAllGroupsByGroupType(page, item_per_page,group_type);
        const total_pages = item_per_page ? Math.ceil(groups.count / item_per_page) : 1;
        return res.status(200).json({
            status: true,
            data: groups.rows,
            payload: {
                pagination: {
                    current_page: page||1,
                    per_page: item_per_page||groups.count,
                    total_items: groups.count,
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

// Get Group by ID
exports.getGroupById = async (req, res) => {
    const groupId = req.params.id;

    try {
        const group = await groupService.getGroupById(groupId);
        return res.status(200).json({
            status: true,
            data: group
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

const groupTypeService = require('../services/groupTypeService');

// Create a new GroupType
exports.createGroupType = async (req, res) => {
    const { name } = req.body;

    try {
        const newGroupType = await groupTypeService.createGroupType({ name });
        return res.status(201).json({
            status: true,
            message: 'GroupType created successfully',
            data: newGroupType
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Update a GroupType by ID
exports.updateGroupType = async (req, res) => {
    const groupTypeId = req.params.id;
    const { name } = req.body;

    try {
        const updatedGroupType = await groupTypeService.updateGroupType(groupTypeId, { name });
        return res.status(200).json({
            status: true,
            message: 'GroupType updated successfully',
            data: updatedGroupType
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Delete a GroupType by ID
exports.deleteGroupType = async (req, res) => {
    const groupTypeId = req.params.id;

    try {
        await groupTypeService.deleteGroupType(groupTypeId);
        return res.status(200).json({
            status: true,
            message: 'GroupType deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get all GroupTypes
exports.getAllGroupTypes = async (req, res) => {
    const page = parseInt(req.query.page) || null;
    const item_per_page = parseInt(req.query.item_per_page) || null;

    try {
        const groupTypes = await groupTypeService.getAllGroupTypes(page, item_per_page);
        const total_pages = item_per_page ? Math.ceil(groupTypes.count / item_per_page) : 1;
        return res.status(200).json({
            status: true,
            data: groupTypes.rows,
            payload: {
                pagination: {
                    current_page: page||1,
                    per_page: item_per_page||groupTypes.count,
                    total_items: groupTypes.count,
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

// Get GroupType by ID
exports.getGroupTypeById = async (req, res) => {
    const groupTypeId = req.params.id;

    try {
        const groupType = await groupTypeService.getGroupTypeById(groupTypeId);
        return res.status(200).json({
            status: true,
            data: groupType
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

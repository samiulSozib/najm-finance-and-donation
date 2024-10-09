const userService=require('../services/userService')

// Get all Usras
exports.getAllUser = async (req, res) => {
   
    try {
        const users = await userService.getAllUser();
       
        return res.status(200).json({
            status: true,
            data: users
            
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};
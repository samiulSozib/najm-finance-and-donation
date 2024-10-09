const db = require('../database/db');

// Get all Usras
const getTransaltion = async ({iso_code}) => {
    
    try {
        const response= await db.Language.findOne({
            where:{iso_code:iso_code},
            attributes: { exclude: ['createdAt', 'updatedAt'] } ,
            include:[
                {
                    model:db.Translation,
                    attributes: { exclude: ['createdAt', 'updatedAt','language_id'] } 
                }
            ]
        });
        return response
        

    } catch (error) {
        console.log(error)
        throw error;
    }
};


module.exports = {
    getTransaltion,
};
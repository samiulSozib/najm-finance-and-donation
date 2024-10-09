const languageService=require('../services/languageService')

// Get all Usras
exports.getTranslation = async (req, res) => {
   const iso_code=req.params.iso_code
    try {
        const data = await languageService.getTransaltion({iso_code});

        const translations = data.Translations;
        const translationObj = {
            language_data: {}
        };

        translations.forEach(translation => {
            translationObj.language_data[translation.translation_key] = translation.translation_value;
        });
        //return translations
       
        return res.status(200).json({
            status: true,
            language_data:translationObj.language_data
            
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};
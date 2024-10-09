const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully. Please verify your email with the OTP sent to your inbox.',
            user
        });
    } catch (error) {
        
        let statusCode;

        switch (error.message) {
            case 'User already exists':
                statusCode = 409;
                break;
            case 'OTP request limit reached for today for this email':
                statusCode = 429; 
                break;
            case 'Failed to create user':
                statusCode = 500; 
                break;
            default:
                statusCode = 400; 
        }
        console.log(error)
        return res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { token, user } = await authService.loginUser(req.body);
        //return res.json(user)
        return res.status(200).json({ status: 'success', message: 'User logged in successfully', token, user });
    } catch (error) {
        const statusCode = error.message === 'Invalid email or password' ? 401 : 400;
        return res.status(statusCode).json({ status: 'error', message: error.message });
    }
};

const verifyUser = async (req, res) => {
    const { user_id, otp } = req.body;

    try {
        const { token, user } = await authService.verifyUser({ user_id, otp });
        return res.status(200).json({ status: true, message: 'User verification successful', token, user });
    } catch (error) {
        const statusCode = error.message === 'Invalid OTP' ? 404 : error.message === 'OTP has expired' ? 400 : 500;
        return res.status(statusCode).json({ status: false, message: error.message });
    }
};

const resendOTP = async (req, res) => {
    const { user_id } = req.body;

    try {
        const user = await authService.resendOTP({ user_id });
        return res.status(200).json({ status: true, message: 'OTP sent successfully', user });
    } catch (error) {
        const statusCode = error.message === 'OTP request limit reached for today' ? 429 : 500;
        return res.status(statusCode).json({ status: false, message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const imageFile=req.file

        const updatedUser = await authService.updateUserProfile(userId, updatedData,imageFile);
        return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const verifyUserForForgotPassword = async (req, res, next) => {
    const { user_id, otp } = req.body;

    try {
        const user = await authService.verifyUserForForgotPassword({ user_id, otp });
        return res.status(200).json({ status: true, message: 'User verification successful', user });
    } catch (error) {
        const statusCode = error.message === 'Invalid OTP' ? 404 : (error.message === 'OTP has expired' ? 400 : 500);
        return res.status(statusCode).json({ status: false, message: error.message, user: {} });
    }
};

module.exports = {
    register,
    login,
    verifyUser,
    resendOTP,
    verifyUserForForgotPassword,
    updateProfile
};

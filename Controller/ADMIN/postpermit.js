const asynHandler = require("express-async-handler");
const userModel= require ('../../Models/UserModel');
const { findOneAndUpdate } = require("../../Models/paymentModel");


const postPermit = async (req, res) => {
    const userEmail = req.params.email;
    const { permit } = req.body;
    try {
        const userData = await userModel.findOneAndUpdate(
            { email: userEmail },
            { permit: permit }, // Object containing the update
            { new: true }
        );
        if (!userData) {
            return res.status(404).json({ error: 'No data available with email id' });
        }
        return res.status(200).json(userData);
    } catch (error) {
        console.error('Error:', error); // Log the actual error for debugging
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {postPermit}
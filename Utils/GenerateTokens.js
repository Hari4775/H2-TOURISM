const jwt = require("jsonwebtoken");
const UserToken = require('../Models/ADMIN/UsesrToken'); 
require('dotenv').config();

const generateTokens = async (user) => {
    try {
        const payload = { _id: user._id,roles:user.roles };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "14m" }
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d" }
        );

        // Find and remove existing token
        // await UserToken.deleteOne({ userId: user._id});
        // // Save new token
        // await new UserToken({ userId: user._id, token: refreshToken }).save();
        const existingUserToken = await UserToken.findOne({userId:user._id});
        if(existingUserToken){
            await existingUserToken.remove();
        }
        await new UserToken({userId:user._id,token:refreshToken}).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = generateTokens;

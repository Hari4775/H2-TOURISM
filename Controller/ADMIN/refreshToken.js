const UerToken = require('../../Models/ADMIN/UsesrToken');
const jwt = require('jsonwebtoken');
const verifyRefreshToken = require('../../Utils/varifyRefreshToken');
const { refreshTokenBodyValidation } = require('../../Utils/ValidateSchema');
const asyncHandler = require('express-async-handler')
require('dotenv').config();

// get new access token
// const newAccessToken =asyncHandler (async(req,res)=>{

//     const { error } = refreshTokenBodyValidation(req.body);
// 	if (error)
// 		return res
// 			.status(400)
// 			.json({ error: true, message: error.details[0].message });

// 	verifyRefreshToken(req.body.refreshToken)
// 		.then(({ tokenDetails }) => {
// 			const payload = { _id: tokenDetails._id };
// 			const accessToken = jwt.sign(
// 				payload,
// 				process.env.ACCESS_TOKEN_PRIVATE_KEY,
// 				{ expiresIn: "14m" }
// 			);
// 			res.status(200).json({
// 				error: false,
// 				accessToken,
// 				message: "Access token created successfully",
// 			});
// 		})
// 		.catch((err) => res.status(400).json(err));
// });

const newAccessToken = asyncHandler(async (req, res) => {
    try {
        const { error } = refreshTokenBodyValidation(req.body);
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const { tokenDetails, error: verifyError } = await verifyRefreshToken(req.body.refreshToken);
        if (verifyError) {
            return res.status(400).json({ error: true, message: verifyError.message });
        }

        const payload = { _id: tokenDetails._id };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "14m" });
        res.status(200).json({ error: false, accessToken, message: "Access token created successfully" });
    } catch (err) {
        res.status(400).json({ error: true, message: err.message });
    }
});


//     const {error}= refreshTokenBodyValidation(req.body);
//     if(error){
//         return res.status(400).json({error:true,message:error.details[0].message});
//     }
//     verifyRefreshToken(req.body.refreshToken)
//       .then(({tokenDetails})=>{
//         const payload = {_id:tokenDetails._id};
//         const accessToken= jwt.sign(
//         payload,
//         process.env.ACCESS_TOKEN_PRIVATE_KEY,
//         {expiresIn:'14m'}
//     );
//     res.status(200).json({error:false,accessToken,message:"Access token created successfully"})

// })
// .catch((error)=>{res.status(400).json(error)})
// }





const logout= async(req,res)=>{
    try{
        const {error} = refreshTokenBodyValidation(req.body);

    }catch(error){
        console.log(error);
        res.status(500).json({error:true,message:"internal server error"})
    }

}

module.exports = {logout,newAccessToken}
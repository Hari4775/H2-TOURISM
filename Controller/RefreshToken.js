// const asyncHandler= require('express-async-handler')
// const jwt = require('jsonwebtoken');
// const UserToken = require('../Models/genarateTokens')
// const varifyRefreshToken = require('../Utils/varifyRefreshToken')
// const {refreshTokenBodyValidation } = require('../Utils/ValidateSchema');

// require('dotenv').config()

// const newAccessToken = asyncHandler(async(req,res)=>{
   
//    try{
//         const {error}= refreshTokenBodyValidation(req.body);
//         if(error){
//             return res
//             .status(400)
//             .json({error:true,message:error.details[0].message});
//         }
//         varifyRefreshToken(req.body.refreshToken)
//         .then(({tokenDetails})=>{
//             const payload ={_id:tokenDetails._id,roles:tokenDetails.roles};
//             const accessToken= jwt.sign(
//                 payload,
//                 process.env.ACCESS_TOKEN_PRIVATE_KEY,
//                 {expiresIn:"14m"}
//             );
       
//       res.status(200).json({
//         error:false,
//         accessToken,
//         message:"Access token created successfully",
//       });
//     })
      
// }catch(error){
//     console.log(error,"errors")
//     res.status(400).json({error:true,message:error.message});
// }
 
// });



// const logout=asyncHandler(async(req,res)=>{
//     try{
//         const {error}= refreshTokenBodyValidation(req.body);
//         if(error){
//             return res
//             .status(400)
//             .json({error:true,message:error.details[0].message});
//         }
//         const userToken = await UserToken.findOne({token:req.body.refreshToken});
//         if(!userToken){
//             return res
//                   .status(200)
//                   .json({error:false,message:"Logged out successfully"})
//         }
//         await userToken.remove();
//         res.status(200).json({error:false,message:"Logged out successfully"})

//     }catch(error){
//         console.log(error)
//         res.status(500).
//         json({error:true,message:"internal server error"})
//     }
// });

// module.exports={newAccessToken, logout}
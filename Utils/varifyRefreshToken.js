// const UserToken = require("../Models/ADMIN/UsesrToken")
// const jwt = require("jsonwebtoken");
// require('dotenv').config()

// const varifyRefreshToken = (refreshToken)=>{
//   const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

//   return new Promise((resolve,reject)=>{
//     UserToken.findOne({token:refreshToken},(err,doc)=>{
//         if(!doc){
//             return reject ({error:true,message:"invalid refresh token"})
//         }
//         jwt.verify(refreshToken,privateKey,(err,tokenDetails)=>{
//             if(err){
//                 return reject({error:true,messge:"Invalid refresh token "})
//             }
       
//          resolve({
//             tokenDetails,
//             error:false,
//             message:"Valid refresh token"
//          });
//         });
//     })
//   })
// };

// module.exports= varifyRefreshToken;
const UserToken = require("../Models/ADMIN/UsesrToken");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const varifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return UserToken.findOne({ token: refreshToken })
        .then((doc) => {
            if (!doc) {
                return Promise.reject({ error: true, message: "Invalid refresh token" });
            }
            return jwt.verify(refreshToken, privateKey)
                .then((tokenDetails) => {
                    return {
                        tokenDetails,
                        error: false,
                        message: "Valid refresh token"
                    };
                })
                .catch((err) => {
                    return Promise.reject({ error: true, message: "Invalid refresh token" });
                });
        })
        .catch((err) => {
            return Promise.reject({ error: true, message: "Error finding refresh token" });
        });
};

module.exports = varifyRefreshToken;

const express= require('express');
const upload= require('../Middleware/upload')
const {uploadToCloudinary,removeFromCloudinary} = require('../Utils/Cloudinary');
const { getUsers, permitForm, updatePermitForm, deletePermitForm, getSinglePermitForm } = require('../Controller/User/UserController');
const { register, login } = require('../Controller/Auth');
const { getAllPackage,  getSinglePackageById } = require('../Controller/ADMIN/AdminPackage');
const { postPermit } = require('../Controller/ADMIN/postpermit');
// const{logout, newAccessToken} = require('../Controller/RefreshToken')

const userRouter= express.Router();

userRouter.route('/register').post(register)
userRouter.route('/login').post(login)

userRouter.route('/permitform_register').post(postPermit)
userRouter.route('/permitform/:email').put(updatePermitForm).delete(deletePermitForm).get(getSinglePermitForm);


userRouter.route('/package').get(getAllPackage)
userRouter.route('/packageDetails/:id').get(getSinglePackageById)
// userRouter.delete('/logout',logout)

// userRouter.post("/refreshToken",newAccessToken)

module.exports = userRouter;
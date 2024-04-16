const express = require('express')
const { register, login } = require('../Controller/ADMIN/adminController')
const {postPermit}=require('../Controller/ADMIN/postpermit')
const { createPackage, createPackageDetails, updatePackage, getAllPackage, getSinglePackageById, deletePackage } = require('../Controller/ADMIN/AdminPackage')
const { newAccessToken, logout } = require('../Controller/ADMIN/refreshToken')
const { getpermitForm, adminUpdatePermit } = require('../Controller/User/UserController')
const adminRoute = express.Router()

adminRoute.post('/register',register)
// adminRoute.route('/refreshToken').post(newAccessToken).delete(logout)
adminRoute.post('/login',login)

adminRoute.get('/permit',getpermitForm);
adminRoute.put('/permit/:id',adminUpdatePermit);


adminRoute.post('/create_package',createPackage);
adminRoute.route('/package').get(getAllPackage)
adminRoute.route('/package/:id').get(getSinglePackageById).put(updatePackage).delete(deletePackage)



// adminRoute.post('/:packageId/details',createPackageDetails);
// adminRoute.put('/package/:packageName',updatePackage)


module.exports = adminRoute
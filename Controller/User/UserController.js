const userModel= require ('../../Models/UserModel')
const paymentModel = require('../../Models/paymentModel')
const asyncHandler =require('express-async-handler')
const cloudinary =require('cloudinary').v2
require('dotenv').config()
const stripe= require('stripe')(process.env.STRIPE_SECRET_KEY);

   
// console.log(process.env.CLOUD_NAME,":name",
// process.env.CLOUD_KEY,": key",
// process.env.CLOUD_KEY_SECRET,": secret"
// )
// cloudinary.config({
//     cloud_name:process.env.CLOUD_NAME,
//     api_key:process.env.CLOUD_KEY,
//     api_secret:process.env.CLOUD_KEY_SECRET
// })




    // console.log(req.body,"reqbody")
    // const file = req.files.photo;
    // const result =await cloudinary.uploader.upload(file)
    // console.log(result,"result")
    // cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    //     console.log(result,"result")

    // })
    // const imageUrl = result.secure_url;
    // res.send(imageUrl)
    // res.send({message:"url"})





    const createPermitForm = asyncHandler(async (req, res) => {
        const { name, email, phone, adhaarNum, guardianName, guardianPhone,policeClearancePhoto,userPhoto,adhaarPhoto } = req.body;
       console.log(req.body,"body")
        // Check if all fields are provided
        if (!name || !email || !phone || !adhaarNum || !guardianName || !guardianPhone ||!policeClearancePhoto || !userPhoto ||!adhaarPhoto) {
            res.status(400);
            throw new Error("All fields are mandatory. Please provide all required information.");
        }
    
        // Check if user with Aadhaar number already exists
        const userAvailable = await userModel.findOne({ adhaarNum: req.body.adhaarNum });
        if (userAvailable) {
            res.status(400);
            throw new Error("A user with the provided Aadhaar number is already registered. Please update the form if necessary.");
        }
    
        try{
            // const paymentIntent = await stripe.paymentIntents.create({
            //     status: 'succeeded',
            //     amount: YOUR_AMOUNT_IN_CENTS, // Replace with the actual amount
            //     currency: 'usd', // Replace with the actual currency
            //     description: 'Payment for registration', // Replace with a description
            //     // Add more details as needed
            // });
            const paymentIntent = {
                amount: 1000, // Replace with the actual amount
                currency: 'usd', // Replace with the actual currency
                description: 'Payment for registration', // Replace with a description
                status: 'succeeded', // Simulate a successful payment status
                payment_method: 'card' // Simulate a payment method
                // Add more details as needed
            };
    
            const paymentData = await paymentModel.create({
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                description: paymentIntent.description,
                status: paymentIntent.status,
                paymentMethod: paymentIntent.payment_method
            });
    
            
           
            // if (paymentIntent.status === 'succeeded') {
            //     // Create a new payment record
            //     const paymentData = await Payment.create({
            //         amount: paymentIntent.amount,
            //         currency: paymentIntent.currency,
            //         description: paymentIntent.description,
            //         status: paymentIntent.status,
            //         paymentMethod: paymentIntent.payment_method
            //     });

   
        // Create new user
        const userData = await userModel.create({
            name,
            email,
            phone,
            adhaarNum,
            guardianName,
            guardianPhone,
            policeClearancePhoto,
            userPhoto,
            adhaarPhoto,
            transactionDetails:paymentIntent
        });

       
        res.status(200).json({message:"registration successfull"})
        // }else{
        //     res.status(400);
        //     throw new Error("payment failed .try again")
        // }

    }catch(error){
        console.log(error,"errror processing payment");
        res.status(500).json({error:"error processing payment . please try again later"})
    }
        // Respond with created user data
        // res.status(200).json(userData);
    });
    







const getpermitForm= asyncHandler(async(req,res)=>{
    try{
        const user = await userModel.find()
        if(user===null){
           res.status(400)
           throw new Error("permit requests not available")
        }
        console.log(user,'users')
        res.status(200).json(user)

    }catch(error){
        res.status(500)
        .json({error:"error fetching users permit"})

    }
    
})

const getSinglePermitForm = asyncHandler(async (req,res)=>{
    try{
        const userEmail =   req.params.email;
        const userPermitForm = await userModel.findOne({email:userEmail})

        if(!userPermitForm){
            res.status(404)
            throw new Error('no data available with the entered emil id')
        }
        res.status(200).json(userPermitForm)

    }catch(error){
        res.status(500)
        .json({error:"error for getting permision form  from database",message:error.message})
    }
});

const updatePermitForm = asyncHandler(async (req, res) => {
    try{
        const userEmail =   req.params.email;
        const updatedUserData = req.body;
    
        const user = await userModel.findOneAndUpdate(
            { email: userEmail },
             updatedUserData, 
             { new: true }
            );
    
        if (!user) {
            res.status(404);
            throw new Error("User data not available");
        }
        res.status(200).json(user);

    }catch(error){
        res.status(500)
        .json({error:"error updating the permit-request Form"})
    }
});



const deletePermitForm = asyncHandler(async (req, res) => {
    const userEmail = req.params.email;

    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await userModel.findOneAndDelete({ email: userEmail });

    res.status(200).json({ message: "User deleted successfully" });
});



const adminUpdatePermit =  asyncHandler(async(req,res)=>{
    try{
        const userPermitForm = await userModel.findById(req.params.id)
        if(!userPermitForm){
            res.status(404)
             throw new Error('user form is not available')       
            }
        const updatedPermit=  await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        
        );
        res.status(200).json(updatedPermit)

    }catch(error){
        res.status(500)
        .json({error: "error updating the permit",message:error.message})
    }
})



// const updateUserForm = asyncHandler(async(req,res)=>{

//     const user = await userModel.findById(req.params.id);
//     if(!user){
//         res.status(404)
//         throw new Error("user Data not Available")
//     }
//     const updatedUser= await userModel.findByIdAndUpdate(
//         req.params.id,

//         req.body,
//         {new:true}
//     );

//     res.status(200).json(updatedUser);
// })


// const deleteUser= asyncHandler(async(req,res)=>{
//     const user= await userModel.findOne(req.params.email)
//     if(!user){
//         res.status(404);
//         throw new Error("user not available")
//     }
//     await userModel.findByIdAndDelete(req.params.email)
//     res.status(200).json("data deleted successfully")

// })
module.exports = {
    createPermitForm,
    updatePermitForm,
    getpermitForm,
    deletePermitForm,
    adminUpdatePermit,
    getSinglePermitForm 
}
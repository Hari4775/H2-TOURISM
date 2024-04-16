const  asyncHandler= require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const {loginvalidation,registerBodyValidation} = require('../../Utils/ValidateSchema')
const generateTokens = require('../../Utils/GenerateTokens');
const AdminModel = require('../../Models/AdminModel');


const register = asyncHandler(async (req, res) => {
    const { name, phone, email, password, cpassword } = req.body;

    try {
        const {error}=  registerBodyValidation(req.body);
        if(error){
            return res.status(400).json({error:true,message:error.details[0].message})
        }
     
        const userAvailable = await AdminModel.findOne({ email });
        if (userAvailable) {
            res.status(400).json({error:true,message:"User with email already exist"});
        }
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const confirmHashedpassword = await bcrypt.hash(req.body.password,salt)
        if (password !== cpassword) {
            res.status(400);
            throw new Error("Password and confirm password do not match");
        }

        const user = await AdminModel.create({
            name,
            email,
            phone,
            password: hashedPassword,
            cpassword:confirmHashedpassword
        });
        console.log("User created", user);
        res.status(201).json({error:false,message:"Account Created Successfully"})

    } catch (error) {
        // Handle any caught errors
        res.status(400).json({ error: error.message });
    }
});





const login=asyncHandler(async(req,res)=>{
    const {email,password} =req.body;
    console.log(req.body,"req body")

try{   
    const {error} = loginvalidation(req.body)
    if(error){
        return res.status(400).json({error:true,message:error.details[0].message})
    }

    //  if(!email || !password){
    //     res.status(400);
    //     throw new Error("all fields mandatory")
    // }
    const userAvailable = await AdminModel.findOne({email:req.body.email});
    if(!userAvailable){
       return res.status(401).json({error:true,message:"Invalid email or password"})
    }

    const varifiedPassword = await bcrypt.compare(
        req.body.password,
        userAvailable.password
    );
    if(!varifiedPassword){
        return res.status(401).json({error:true,message:"Invalid email or pssword"})
    }

    const {accessToken, refreshToken} = await generateTokens(userAvailable)
     
    res.status(200).json({error:false,accessToken,refreshToken,message:"Logged succssfully"})

    // if(userAvailable && ( await bcrypt.compare(password,userAvailable.password))){
    //     const accessToken = jwt.sign({
    //         userAvailable:{
    //             name:userAvailable.name,
    //             email:userAvailable.email,
    //             id:userAvailable.id
    //         },
    //     },process.env.ACCESS_TOKEN_SECRET,
    //      {expiresIn:'1m'}
    //     );
    //     res.status(200).json({accessToken,message:"login  successfully"});
    // }
    // else{
    //     res.status(401)
    //     throw new Error(" user id or password not valid")
    // }
    // res.json({message:"login  successfully"})

}catch(error){
     console.log(error,"error")
     res.status(500).json({error:true,message:"internal server error"})
}
});



const forgotPassword =asyncHandler(async(req,res)=>{
    try{
        const {email}= req.body;
        const user = AdminModel.findOne({email:email})
        .then()

    }catch(error){

    }
})


module.exports= {register,login}



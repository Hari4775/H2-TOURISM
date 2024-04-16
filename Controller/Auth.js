const User= require('../Models/User')
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { registerBodyValidation,loginBodyvalidation } = require('../Utils/ValidateSchema');
const generateTokens = require('../Utils/GenerateTokens');
require('dotenv').config();

const register=asyncHandler( async(req,res)=>{
    const {userName,phone,email,password,cpassword}= req.body;
    try{
        const {error} = registerBodyValidation(req.body)
        if(error){
            return res.status(400).json({error:true,message:error.details[0].message});
        }
        const userBymail = await User.findOne({email:req.body.email})
        if(userBymail){
            return res.status(400).json({error:true,message:"User with given email id  already exist"})
        }
        const userByPhone = await User.findOne({phone:req.body.phone})
        if(userByPhone){
            return res.status(400).json({error:true,message:"User with given Phone number  already exist"})
        }
        
        const salt= await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        console.log("password",password,cpassword)
        const confirmHashedpassword = await bcrypt.hash(req.body.cpassword,salt)

        if (password !== cpassword) {
           return res.status(400)
            .json({message:"password not mactching"});
            
        }

        const user = await User.create({
            userName,
            email,
            phone,
            password: hashedPassword,
            cpassword:confirmHashedpassword
        });
        console.log("User created", user);
        res.status(201).json({error:false,message:"Account Created Successfully"})

        await  new User({...req.body,password:hashedPassword}).save();

    }catch(error){
      res.status(500).json({error:true,message:"internal server Error"});
    }
});



const login =asyncHandler(async(req,res)=>{
    const {email,password}= req.body;

    try{
         const {error} = loginBodyvalidation(req.body);
         if(error){
            return res
            .status(400)
            .json({error:true,message:error.details[0].message})
         }

         const userAvailable = await User.findOne({email:req.body.email})
         if(!userAvailable){
             return res
             .status(401)
             .json({error:true,message:"invalid email or password"})
         }

         const varifiedPasssword= await bcrypt.compare(
            req.body.password,
            userAvailable.password
         )
         if(!varifiedPasssword){
            return res.status(401)
            .json({error:true,message:"invalid email or password"})
         }
        
         const {accessToken,refreshToken}= await generateTokens(userAvailable)
         res.status(200).json({
            error:false,
            accessToken,
            refreshToken,
            message:"Logged in successfully",
         });

         if(accessToken && refreshToken){
            res.status(200).json({
                error:false,
                accessToken,
                refreshToken,
                message:"Already logged",
             });
         }
    }catch(error){
        console.log(error)
        return res.status(400).json({error:true,message:"internal server error"})


    }
}) 

module.exports={register,login}
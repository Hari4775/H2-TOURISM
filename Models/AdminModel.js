const mongoose= require('mongoose')


const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the name"]
    },
    email:{
        type:String,
        required:[true,"please enter  the email"],
        unique:[true,"the email id is already registered"]
    },
    phone:{
        type:String,
        required:[true,"please enter the phone number"],
        unique:[true,"these phone number already registerd"]
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
       
    },
    cpassword:{
        type:String,
        required:[true,"please enter the passsword"],
       
    }
},
{
timeStamps:true,
}
)




module.exports= mongoose.model("adminData",adminSchema)
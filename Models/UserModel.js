const mongoose = require('mongoose')

const userFormSchema= mongoose.Schema({

    name:{
        type:String,
        required:[true,"please enter the Name"]
    },
    email:{
        type:String,
        required:[true,"please enter the email Address"]
    },
    phone:{
        type:String,
        required:[true,"Please enter the Phone number"]
    },
    adhaarNum:{
        type:String,
        required:[true,"Please enter the ADHAAR number"]
    },
    guardianName:{
        type:String,
        required:[true,"Please enter your guardian Name"]
    },
    permit:{
        type:String
    },
    guardianPhone:{
        type:String,
        required:[true,"Enter the Phone number of your Guardian"]
    },
    policeClearancePhoto:{
         type:String,
         required:[true,"Upload the police clearance certificate"]
        
        },
    userPhoto:{
        type:String,
        required:[true,"Insert the Passport size photo"]
    },
    adhaarPhoto:{
        type:String,
        required:[true,"Inert your adhaar card photo"]
    },
    transactionDetails:{
        type:mongoose.Schema.Types.Mixed
    },
    permitStatus:{
        type:String
    },
    permitNumber:{
      type:String
    },
    permitImage:{
        type:String
    }

},
{
    timestamps:true
}
)



module.exports= mongoose.model('GUEST-REGISTER-DATA',userFormSchema)
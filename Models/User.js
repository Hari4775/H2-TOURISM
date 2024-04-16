const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema= new Schema({

    userName:{
        type:String,
        required:[true,"enter the Name"]
    },
    email :{
        type:String,
        required:true,
        unique:[true,"enter the Email"]
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    roles:{
        type:[String],
        enum:["user","admin","super_admin"]
    },

})

module.exports = mongoose.model("User", userSchema);

const mongoose= require('mongoose')
const Schema= mongoose.Schema

const generaTokenSchema = mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:30*86400
    },
})


module.exports= mongoose.model("UserTokens",generaTokenSchema)
const mongoose = require('mongoose')

const DBconnect= async()=>{
    try{
        const connect = await mongoose.connect(process.env.DB_URL)
        console.log("database is connected")

    }catch(error){
        console.log(error," error")
    }
}

module.exports = DBconnect;
const mongoose = require('mongoose')


const connectUserDB= async()=>{
    try{
        const connect = await mongoose.connect(process.env.USER_DB_URL)
        console.log("database is connected")

    }catch(error){
        console.log(error," error")
    }
};

const connectAdminDB= async()=>{
    try{
        const connect = await mongoose.connect(process.env.ADMIN_DB_URL)
        console.log("database is connected")

    }catch(error){
        console.log(error," error")
    }
};

const connectSuperAdminDB= async()=>{
    try{
        const connect = await mongoose.connect(process.env.SUPER_ADMIN_DB_URL)
        console.log("database is connected")

    }catch(error){
        console.log(error," error")
    }
};



module.exports ={ connectAdminDB,connectUserDB,connectSuperAdminDB};
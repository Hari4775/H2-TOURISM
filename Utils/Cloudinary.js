const cloudinary = require('cloudinary').v2;


console.log(process.env.CLOUD_NAME,":name",
process.env.CLOUD_KEY,": key",
process.env.CLOUD_KEY_SECRET,": secret"
)
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_KEY_SECRET
})

uploadCloudinary= (path,folder) =>{
    return cloudinary.v2.uploader.upload(path,{
        folder
    }).then((data)=>{
        return {url:data.url,public_id:data.public_id};
    }).catch((error)=>{
        console.log(error)
    })
}

removeFromCloudinary = async (public_id) =>{
    await cloudinary.v2.uploader.destroy(public_id,function(error,result){
        console.log(result,err)
    })

}

module.exports= {uploadCloudinary,removeFromCloudinary};


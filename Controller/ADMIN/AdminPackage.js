const asyncHandler= require("express-async-handler")
const packageModel = require('../../Models/packages/packages')
const packageDetails = require('../../Models/packages/packageDetails')

const createPackage= asyncHandler (async(req,res)=>{
        const { packageImage,packageName,price,packageDetails,offer} = req.body;

    const newPackage = await packageModel.create({
        packageName,
        packageImage,
        price,
        offer,
        packageDetails   
    })

    if(newPackage){
        res.status(200).json({message:newPackage})
    }else{
        res.status(400)
        throw new Error("package creation error")
    }
})



const createPackageDetails= asyncHandler(async(req,res)=>{
    try{

        const package = await packageModel.findById(req.params.id)
        if(package == null){
            return res.status(404)
            .json({message:"Package not found"});
        }

        package.packageDetails.push({
            packageName: req.body.packageName,
            packageImages: req.body.packageImages,
            duration: req.body.duration,
            packagePrice: req.body.packagePrice,
            travelCharge: req.body.travelCharge,
            packageDiscount: req.body.packageDiscount,
            placesDetails: req.body.placesDetails,
            accomodation: req.body.accomodation,
            activityDetails: req.body.activityDetails
        });
        const updatedPackage = await package.save();
        res.json(updatePackage)
}catch(error){
    res.status(400).json({ message: error.message });
}
})




const getAllPackage= asyncHandler(async(req,res)=>{
    try{
        const allPackages = await packageModel.find()
        console.log(allPackages,'all packagess')
        res.status(200).json(allPackages)

    }catch(error){
        res.status(400)
        .json({message:error.message})

    }

});



const getSinglePackageById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const package = await packageModel.findById(id);
        if (!package) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.status(200).json(package);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


const updatePackage = asyncHandler(async (req, res) => {
    const package = req.params.id; 
    try {
        if(!package){
            res.status(404)
            throw new Error('package not available')
        }
        const updatedPackage = await packageModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
       res.status(200).json(updatedPackage)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const deletePackage = asyncHandler (async(req,res)=>{
  try{
    const package = await packageModel.findById(req.params.id)
    if(!package){
        res.status(404)
        throw new Error('package not available')
    }
    await packageModel.findOneAndDelete({ _id: package });
    res.status(200).json({ message: "package deleted successfully" });

  }catch(error){

  }
})

module.exports={createPackage,createPackageDetails,getAllPackage,updatePackage,getSinglePackageById,deletePackage}
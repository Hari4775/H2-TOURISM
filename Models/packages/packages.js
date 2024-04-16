
const { string, required } = require('joi');
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    placename: {
        type: String
    },
    placeImages: {
        type: String
    }

})

const activitySchema = new mongoose.Schema({

    activityName: {
        type: String
    },
    activityDescription: {
        type: String
    },
    activityPrice:{
        type:String
    },
    activityImage:{
        type:String
    }
})


const packageDetailSchema = new mongoose.Schema({
    packageName: {
        type: String,
        // required: [false, "Package name required"]
    },
    packageImages: {
        type: String,
        // required: [false, "Upload package Image"]
    },
    duration: {
        type: String,
        // required: [false, "Enter the package Duration"]
    },
    packagePrice: {
        type: String,
        // required: [false, "Enter package Price"]
    },
    travelCharge: {
        type: String,
        // required: [false]
    },
    packageDiscount: {
        type: String,
        // required: [false, "Enter package Discount Price"]
    },
    placesDetails: {
       type: [placeSchema],
        // required: [false, "Enter locations"]
    },
    accomodation: {
        type: String,
        // required: [false, "Enter accommodation details"]
    },
    activityDetails: [activitySchema]
    
},
{
   timestamps: true
});


const packageSchema = new mongoose.Schema({
    packageName:{
        type:String,
        required:[true,"package name required"]
    },
    packageImage: {
        type: String,
        required: [true, "Upload package Image"]
    },
    offer:{
        type:String,
       
    },
    price:{
        type:String,
        required:[true,"enter the starting"]
    },
    packageDetails: {
       type:[packageDetailSchema],
       required:[true,"enter the package details"]
    },
},
 {
    timestamps: true
});

module.exports = mongoose.model("Package", packageSchema);

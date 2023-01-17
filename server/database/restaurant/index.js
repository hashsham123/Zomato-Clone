import mongoose, { Types } from "mongoose";

const RestaurantSchema = new mongoose.Schema({
name:{type:String,required:true},
city:{type:String,required:true},
address:{type:String,required:true},
mapLocation:{type:String,required:true},
cuisine:{String},
RestaurantTimings:{type:String},
contactNumber:{type:Number},
website:{type:String},
popularDishes:[String],
averageCost:Number,
amenties:[String],
menuImages:{type:mongoose.Types.ObjectId,ref:"images"},
menu:{
    type:mongoose.Types.ObjectId,
    ref:"menus",
},
reviews:[{
    type:mongoose.Types.ObjectId,
    ref:"reviews"
}],
photos:{type:mongoose.Types.ObjectId,
    ref:"images"},
},

{
    timestamps
    :true
});

export const ResturantModel = mongoose.model("restaurants",RestaurantSchema);
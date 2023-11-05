import mongoose from "mongoose";
const PropertyScehma=new mongoose.Schema({
  title:{type:String,required:true},
  description:{type:String,required:true},
  propertyType:{type:String,required:true},
  location:{type:String,required:true},
 
  photo:{type:String,required:true},
  phone:{type:Number},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  createdAt: { type: Date, default: Date.now } ,
  foundlost:{type:String}
})

const propertyModel=mongoose.model('Property',PropertyScehma)

export default propertyModel
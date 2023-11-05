import propertyModel from "../models/property.js"
import UserModel from "../models/model.js"
import mongoose from "mongoose"
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'

dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



const getAllProperty=async(req,res)=>{

  const {_end,_order,_start,_sort,title_like="",propertyType=""}=req.query
   const query={}
   if(propertyType!==''){
    query.propertyType=propertyType
   }
   if(title_like){
    query.title={$regex:title_like,$options:'i'}

   }
  try {
    const count=await propertyModel.countDocuments({query})
    const properties=await propertyModel.find(query).limit(_end).skip(_start).sort({[_sort]:_order})
    
    res.header('x-total-count',count);
    res.header('Access-Control-Expose-Headers','x-total-count')

    res.status(200).json(properties)
  } catch (error) {
     res.status(500).json({msg:error.message})
  }

}
const getPropertyById=async(req,res)=>{
   const {id}=req.params
   const Propertyexist= await propertyModel.findOne({_id:id}).populate('creator')
   if(Propertyexist){
    res.status(200).json(Propertyexist)
   }else{
    res.status(404).json({msg:"Sorry But Property Not Found"})
   }
}


    const createProperty = async (req, res) => {
        try {
          const { title, description,  location, email, photo,phone ,propertyType,foundlost} = req.body;
      
          // The following command makes this process an atomic request to ensure consistency
          const session = await mongoose.startSession();
          session.startTransaction();
      
          const user = await UserModel.findOne({ email }).session(session);
          
          if (!user) {
            throw new Error('USER NOT FOUND');
          }
      
          // Use try-catch to handle potential errors during the property creation process
          try {
            // Upload the photo to Cloudinary
            const photoUrl = await cloudinary.uploader.upload(photo);
      
            // Create a new property
            const newProperty = await propertyModel.create({
              title,
              description,
              location,
               foundlost,
              photo: photoUrl.url,
              creator: user._id,
              propertyType,
              phone
            });
      
            user.allProperties.push(newProperty._id);
            await user.save({ session });
            await session.commitTransaction();
      
            res.status(200).json({ msg: 'Property Created Successfully' });
          } catch (error) {
            // Log the error message for debugging
            console.error('Error creating property:', error);
            throw error; // Re-throw the error to the outer catch block
          }
        } catch (error) {
          console.error('Error in createProperty:', error);
          res.status(500).json({ msg: 'Something Went Wrong With This' });
        }
      };
      




const updateProperty=async(req,res)=>{
 try {
  const {id}=req.params
  const {title,description,propertyType,location,photo,phone,foundlost}=req.body
  const photoUrl=await cloudinary.uploader.upload(photo)
  await propertyModel.findByIdAndUpdate({_id:id},{
    title,
    description,
    propertyType,
    location,
     foundlost,
    photo:photoUrl.url,
    phone
  })
  res.status(200).json({msg:'Property Updated Successfully'})
} catch (error) {
  res.status(500).json({msg:'Something Went Wrong'})
 }
}

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const PropertyDelete = await propertyModel.findById({ _id: id }).populate('creator');
    if (!PropertyDelete) throw new Error('Property not found');
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    await propertyModel.deleteOne({ _id: id }).session(session); // Use deleteOne on the model
    
    PropertyDelete.creator.allProperties.pull(PropertyDelete);

    await PropertyDelete.creator.save({ session });
    await session.commitTransaction();
    
    res.status(200).json({ msg: 'Property Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export{
    getAllProperty,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
}

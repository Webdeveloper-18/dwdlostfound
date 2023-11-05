import UserModel from "../models/model.js";

const getAllUsers=async(req,res)=>{
 try {
    const users=await UserModel.find({}).limit(req.query._end)
    res.status(200).json(users)
 } catch (error) {
    res.status(500).json({msg:error.message})
 }
}

const creatUser=async(req,res)=>{
    try {
        const {name,email,avatar}=req.body
        //checking if the user already exits
        const UserExits=await UserModel.findOne({email})
        if(UserExits){
          return res.status(200).json(UserExits)
        }
        const NewUser=await UserModel.create({
            name,email,avatar
        })
       return res.status(200).json(NewUser)
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
   

}

const getUserInforById=async(req,res)=>{
  const {id}=req.params
  const profile=await UserModel.findOne({_id:id}).populate('allProperties') //populate('allProperties')  this will give us alproperties corresponding to user
  if(profile) {
    res.status(200).json(profile)
}
 else{ 
    res.status(404).json({msg:'No User Found'})
}
}

export{
    getAllUsers,
    creatUser,
    getUserInforById
}
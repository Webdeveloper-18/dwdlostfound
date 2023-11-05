import mongoose from "mongoose"

const connectDB=async(url)=>{
//    mongoose.set('strictQuery',true);
//    mongoose.connect(url)
//    .then(()=>{console.log("CONNECT TO THE DATABASE...!")})
//    .catch((err)=>{console.log(err)})
try{
    mongoose.set('strictQuery',true)
    await mongoose.connect(url)
    console.log("CONNECT TO THE DATABASE...!")
}catch(err){
    console.log(err)
}
}
export default connectDB
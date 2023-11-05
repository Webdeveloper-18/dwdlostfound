import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./db/connect.js";
import routerp from "./routes/property.routes.js";
import router from './routes/user.routes.js'
dotenv.config();
const app=express()
app.use(cors())
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/user',router)
app.use('/api/v1/belonging',routerp)

app.get('/',(req,res)=>{
    res.send({msg:'Hello'})
})


const start=async()=>{
    try{
        //connect server
           await connectDB(process.env.DB_CONNECT_URI)
        app.listen(5000,()=>{console.log("Server is Live")})
    }
    catch(err){
        console.log(err)
    }
}

start()

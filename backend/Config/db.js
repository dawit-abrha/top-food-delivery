import mongoose from "mongoose";

const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://wediabrhana:yesno1212@cluster0.m8kc0.mongodb.net/Food-delivery')
   .then(() =>{
       console.log('MongoDB Connected')
   })
}



export default connectDB;
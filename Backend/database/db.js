import mongoose from "mongoose";
import dotenv from 'dotenv';
import dns from 'dns';


dotenv.config();

const dbconnection = async() => {
   dns.setServers(['8.8.8.8', '1.1.1.1']);
  
   await mongoose.connect(process.env.DB_URL);
   console.log("Mongo db connected Successfully!")
}

export default dbconnection;
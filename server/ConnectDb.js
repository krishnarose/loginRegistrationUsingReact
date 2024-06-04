// import mongoose from "mongoose";
// export const connectToDb = async()=>{
//     try {
//         const url = process.env.URL;
//         console.log("url string",url)
//         await mongoose.connect(url);
//         console.log('MONGO DB CONNECTED')
//     } catch (error) {
//         console.log("Error",error)
        
//     }
// }


// ConnectDb.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDb = async () => {
  try {
    const url = process.env.URL;
    console.log("Connecting to MongoDB with URL:", url);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

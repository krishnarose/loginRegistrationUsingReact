import mongoose from "mongoose";
export const connectToDb = async()=>{
    try {
        const url = process.env.URL;
        console.log("url string",url)
        await mongoose.connect(url);
        console.log('MONGO DB CONNECTED')
    } catch (error) {
        console.log("Error",error)
        
    }
}
import  Express  from "express";
import { connectToDb } from "./ConnectDb.js";
import dotenv from 'dotenv'
import cors from 'cors'
const app = Express();
app.use(cors());
dotenv.config();

connectToDb();




app.get('/',(req, res)=>{
    res.send('This is server message')
})

const PORT = 7000;

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
})
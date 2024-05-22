import express from "express";
import { connectToDb } from "./ConnectDb.js";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs"; // Import bcryptjs library
import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());

connectToDb();

app.get("/", (req, res) => {
  res.send("This is server message");
});

//route for getting data from client

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  try {
    const { email, name, pass } = req.body;

    // Check if email field is missing
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    //   Check if email field is not a valid email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email is not valid formate" });
    }

    // Check if all required fields are present
    if (!email || !name || !pass) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //check if email already exist the data base
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "email already exists" });
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!#$])[A-Za-z\d@!#$]{8,}$/;
    if (!passwordRegex.test(pass)) {
      return res
        .status(400)
        .json({
          error:
            "Password must be at least 8 characters long and contain at least one special character (@, !, #, or $)",
        });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10); // 10 is the saltRounds

    /// Create a new user document with hashed password
    const newUser = new User({ email, name, pass: hashedPassword });

    //save the user to the database
    await newUser.save();

    // console.log("User registerd:", newUser);
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  // Function to validate email format
  function isValidEmail(email) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});

// Express.js email verification route
app.post('/verify-email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    res.status(200).json({ message: 'User exists' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/login',async(req,res)=>{
  try {
    const {email,pass} = req.body;
    // console.log(email,pass)
    const user = await User.findOne({email});

    if(!user){
      return res.status(401).json({ error: 'Email is incorrect please try again or register with another email'});

    }
    const passwordMatch = await bcrypt.compare(pass,user.pass);

    if(!passwordMatch) {
      return res.status(401).json({error: 'password is incorrect'});
    }
    const token = jwt.sign({email: user.email}, 'your_secret_key',{ expiresIn: '1h'})
    return res.status(200).json({message:"user logged in",status:200,token,user})
 
  } catch (error) {
    console.error('Error logging in user:',error)
    res.status(500).json({error: 'Internal server error'})
  }
})

const PORT = 7000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server started on http://${HOST}:${PORT}`);
});

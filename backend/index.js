import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/Routes.js';
import connectDB from './config/connectDb.js';

const corsOptions = {
  origin: 'https://form-creator-frontend1.onrender.com', 
  optionsSuccessStatus: 200 
};


const app = express();
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/forms", router);

const PORT=8080 || process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("server is running",PORT);
    
    })
})


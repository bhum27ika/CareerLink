import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';    
dotenv.config();
import connectDB from './utils/db.js';
const app = express();
import userRoute from './routes/user.route.js';

app.get("/home", (req,res) => {
    return res.status(200).json({
        message: "Hello from backend",
        success: true
    })
});

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

//apis

app.use("/api/v1/user", userRoute);

app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})
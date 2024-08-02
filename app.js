import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js";
import categoryProductRoutes from "./Routes/productCatRoutes.js";
import categoryBlogRoutes from "./Routes/blogCatRoutes.js";
import brandRoutes from "./Routes/brandRoutes.js";
// import {notFound,errorHandler} from "./Middleware/errorHandler.js"
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
const app = express();

// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Cookie Parser

app.use(cookieParser());

// send data in a frontend

app.use(cors());

// use Routes

app.use(userRoutes);
app.use(productRoutes);
app.use(blogRoutes);
app.use(categoryProductRoutes);
app.use(categoryBlogRoutes);
app.use(brandRoutes);

// error handler

// app.use(notFound);
// app.use(errorHandler)


// database connection

mongoose.connect(process.env.DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>
    {
        console.log("database connection successfully");
    })
    .catch((error)=>
    {
        console.log(error);
    })

const Port = 5000;

app.listen(Port,()=>
{
    console.log(`listing the port number on ${Port}`);
})
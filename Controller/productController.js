import { query } from "express";
import  productModel from "../Models/productModel.js";
import userModel from "../Models/userModel.js"
import asynchandler from "express-async-handler";
import slugify from "slugify";

// create Product

export const createProduct = asynchandler(async(req,res)=>
{
   if(req.body.title)
   {
    req.body.slug = slugify(req.body.title)
   } 
    const createProduct = await productModel.create(req.body)
    try {
        if(createProduct)
        {
            res.json({status:201,message:createProduct});
        }
        else
        {
            res.json({status:400,message:"Product not create"});
        }
    } catch (error) {
        console.log(error);
    }
})
   
  // get all Product
  export const getAllProduct = asynchandler(async (req, res) => {
    try {
        // Filter Records
        const queryDb = { ...req.body };
        const excludes = ["page", "sort", "limit", "fields"];
        excludes.forEach((element) => delete queryDb[element]);

        // Convert query to MongoDB syntax
        let strquery = JSON.stringify(queryDb);
        strquery = strquery.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        // Find products based on the filtered query
        let findProduct = productModel.find(JSON.parse(strquery));

        // Sorting Records
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            findProduct = findProduct.sort(sortBy);
        } else {
            // Default sorting if no sort parameter is provided
            findProduct = findProduct.sort("-createdAt");
        }

        // Limit the fields
        if (req.query.fields) {
            let limitquery = req.query.fields.split(",").join(" ");
            findProduct = findProduct.select(limitquery);
        } else {
            // Exclude sensitive fields by default
            findProduct = findProduct.select("-sensitiveField1 -sensitiveField2 -__v");
        }

        // Pagination
        let page = req.query.page ? parseInt(req.query.page, 10) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        let skip = (page - 1) * limit;
        findProduct = findProduct.skip(skip).limit(limit);

        if (req.query.page) {
            let countFields = await productModel.countDocuments();
            if (skip >= countFields) {
                throw new Error("Page does not exist");
            }
        }

        const products = await findProduct.exec();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// get Single Product

export const getSingleProduct = asynchandler(async(req,res)=>
{
    const findProduct = await productModel.findOne({_id:req.params.id});
    try {
        if(findProduct)
        {
            res.json({status:201,message:findProduct});
        }
        else
        {
            res.json({status:400,message:"Product not found"})
        }
    } catch (error) {
        throw new Error(error)
    }
})

// update User

export const updateProduct = asynchandler(async(req,res)=>
{
    if(req.body.title)
    {
        req.body.slug = slugify(req.body.title);
    }
    const productUpdate = await productModel.updateOne({_id:req.params.id},{$set:req.body});
    try {
        if(productUpdate)
        {
            res.json({status:201,message:productUpdate});
        }
        else
        {
            res.json({status:400,message:"User not update"});
        }
    } catch (error) {
        throw new Error(error);   
    }
})

// delete Product

export const deleteProduct = asynchandler(async(req,res)=>
{
    const productdelete = await productModel.deleteOne({_id:req.params.id});
    try {
        if(productdelete)
        {
            res.json({status:201,message:"User delete successfully"});
        }
        else
        {
            res.json({status:400,message:"User not delete"});
        }
    } catch (error) {
        throw new Error(error)
    }
})


// Add To Wish List

export let addtoWishList = asynchandler(async(req,res)=>
{
   
})
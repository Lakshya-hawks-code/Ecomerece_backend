import productcatModel from "../Models/productCatModel.js"
import asynchandler from "express-async-handler";


// Create Category

export let createCategory = asynchandler(async(req,res)=>
{
    try {
        let categoryCreate = await productcatModel.create(req.body);
        if(categoryCreate)
        {
            res.json({status:200,message:"Category create successfully"});
        }
        else
        {
            res.json({status:400,message:"Category not create"});
        }
    } catch (error) {
        res.json({status:500,message:"Internal Server error"})
    }
})

// get all Category

export let getAllCategory = asynchandler(async(req,res)=>
{
   try {
    let findAllCategory = await productcatModel.find();
    if(findAllCategory)
    {
        res.json({status:200,message:findAllCategory});
    }
    else
    {
        res.json({status:400,message:"Category not find"});
    }
   } catch (error) {
    res.json({status:500,message:"Internal server error"});
   }
})

// get Single Category

export let getSingleCategory = asynchandler(async (req, res) => {
    try {
        let findSingleCategory = await productcatModel.findById({ _id: req.params.id });

        if (findSingleCategory) {
            res.json({ status: 200, message: "Single Category found successfully", data: findSingleCategory });
        } else {
            res.json({ status: 400, message: "Single Category not found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 500, message: "Internal server error" });
    }
});
// update Category

export let updateCategory = asynchandler(async(req,res)=>
{
    try {
        let categoryUpdate = await productcatModel.findByIdAndUpdate({_id:req.params.id},{$set:req.body});
        if(categoryUpdate)
        {
            res.json({status:200,message:"Category update successfully"});
        }
        else
        {
            res.json({status:400,message:"Category not update"});
        }
    } catch (error) {
        res.json({status:500,message:"Internal server error"});
    }
})


// delete Category

export let deleteCategory = asynchandler(async(req,res)=>
{
    try {
        let categorydelete = await productcatModel.deleteOne({_id:req.params.id});
        if(categorydelete)
        {
            res.json({status:200,message:"Category delete successfully"});
        }
        else
        {
            res.json({status:400,message:"Category not delete"});
        }
    } catch (error) {
        res.json({status:500,message:"Internal server error"});
    }
})
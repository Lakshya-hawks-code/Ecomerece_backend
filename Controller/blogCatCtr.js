import blogcatModel from "../Models/blogCatModel.js";
import asynchandler from "express-async-handler";


// Create Category

export let createBlogCategory = asynchandler(async(req,res)=>
{
    try {
        let categoryCreate = await blogcatModel.create(req.body);
        if(categoryCreate)
        {
            res.json({status:200,message:"Blog Category create successfully"});
        }
        else
        {
            res.json({status:400,message:"Blog Category not create"});
        }
    } catch (error) {
        res.json({status:500,message:"Internal Server error"})
    }
})

// get all Category

export let getAllBlogCategory = asynchandler(async(req,res)=>
{
   try {
    let findAllCategory = await blogcatModel.find();
    if(findAllCategory)
    {
        res.json({status:200,message:findAllCategory});
    }
    else
    {
        res.json({status:400,message:"Blog Category not find"});
    }
   } catch (error) {
    res.json({status:500,message:"Internal server error"});
   }
})

// get Single Category

export let getSingleBlogCategory = asynchandler(async(req,res)=>
{
   try {
    let findSingleCategory = await blogcatModel.findOne({_id:req.params.id});
    if(findSingleCategory)
    {
        res.json({status:200,message:"Single Blog Category find successfully"});
    }
    else
    {
        res.json({status:400,message:"Single Blog Category not find"});
    }
   } catch (error) {
    res.json({status:500,message:"Internal server error"});
   }
})

// update Category

export let updateBlogCategory = asynchandler(async (req, res) => {
    try {
        let categoryUpdate = await blogcatModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
        if (categoryUpdate) {
            res.json({ status: 200, message: "Blog Category updated successfully" });
        } else {
            res.json({ status: 400, message: "Blog Category not updated" });
        }
    } catch (error) {
        res.json({ status: 500, message: "Internal server error" });
    }
});

// delete Category

export let deleteBlogCategory = asynchandler(async(req,res)=>
{
    try {
        let categorydelete = await blogcatModel.deleteOne({_id:req.params.id});
        if(categorydelete)
        {
            res.json({status:200,message:"Blog Category delete successfully"});
        }
        else
        {
            res.json({status:400,message:"Blog Category not delete"});
        }
    } catch (error) {
        res.json({status:500,message:"Internal server error"});
    }
})
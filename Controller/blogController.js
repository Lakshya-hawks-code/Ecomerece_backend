import blogModel from "../Models/blogModel.js";
import asynchandler from "express-async-handler";

// Create Blog

export let blogcreate = asynchandler(async(req,res)=>
{
  try {
     let createblog = await blogModel.create(req.body);
     if(createblog)
     {
        res.json({status:200,message:createblog});
     }
     else
     {
        res.json({status:400,message:"blog not create"});
     }
  } catch (error) {
    res.json({status:404,message:error});
  }
})

// Find All Blog


export let getAllBlog = asynchandler(async(req,res)=>
{
    try {
        let findallblog = await blogModel.find();
        if(findallblog)
        {
            res.json({status:200,message:findallblog});
        }
        else
        {
            res.json({status:400,message:"blog not find"});
        }
    } catch (error) {
        res.json({status:404,message:error});
    }
});

// Find Single Blog

export let getsingleblog = asynchandler(async(req,res)=>
{
    try {
        let singleblogfind = await blogModel.findById({_id:req.params.id});
        if(singleblogfind)
        {
            res.json({status:200,message:"Single blog find successfully"});
        }
        else
        {
            res.json({status:400,message:"single blog not find"});
        }
    } catch (error) {
        res.json({status:404,message:error});
    }
});


// Update Blog

export let updateblog = asynchandler(async(req,res)=>
{
    try {
        let blogupdate = await blogModel.findByIdAndUpdate({_id:req.params.id},{$set:req.body});
        if(blogupdate)
        {
            res.json({status:200,message:"blog update successfully"});
        }
        else
        {
            res.json({status:400,message:"blog not update"});
        }
    } catch (error) {
        res.json({status:400,message:error})
    }
})


// Delete Blog

export let deleteblog = asynchandler(async(req,res)=>
{
    try {
        let blogdelete = await blogModel.findByIdAndDelete({_id:req.params.id});
        if(blogdelete)
        {
            res.json({status:200,message:"blog delete successfully"});
        }
        else
        {
            res.json({status:400,message:"blog not delete"});
        }
    } catch (error) {
        res.json({status:404,message:error});
    }
})

// Like Blog

export let likeblog = asynchandler(async(req,res)=>
{
   try {
    let blogId = req.params.id;
    let findBlog = await blogModel.findById(blogId);
    if(!findBlog)
    {
        res.json({status:400,message:"Blog not found"});
    }
    findBlog.isLiked = !findBlog.isLiked;
    const updateBlog = await findBlog.save();
    res.json({status:200,message:updateBlog});
   } catch (error) {
    res.json({status:500,message:"Internal server error"});
   }
})

// Dislike Blog

export let dislikeblog = asynchandler(async(req,res)=>
{
   try {
     let blogId = req.params.id;
    let findBlog = await blogModel.findById(blogId);
    if(!findBlog)
    {
        res.json({status:400,message:"blog not find"});
    }
    findBlog.isDisliked = !findBlog.isDisliked;
    const updateBlog = await findBlog.save();
    res.json({status:200,updateBlog});
   } catch (error) {
    res.json({status:500,message:"Internal server error"});
   }
})
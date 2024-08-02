import brandModel from "../Models/brandModel.js"
import asynchandler from "express-async-handler";


// Create Category

export let createBrand = asynchandler(async(req,res)=>
{
    try {
        let Createbrand = await brandModel.create(req.body);
        if(Createbrand)
        {
            res.json({status:200,message:"Brand create successfully"});
        }
        else
        {
            res.json({status:400,message:"Brand not create"});
        }
    } catch (error) {
        res.json({status:500,message:error})
    }
})

// get all Category

export let getAllBrand = asynchandler(async(req,res)=>
{
   try {
    let findAllBrand = await brandModel.find();
    if(findAllBrand)
    {
        res.json({status:200,message:findAllBrand});
    }
    else
    {
        res.json({status:400,message:"Brand not find"});
    }
   } catch (error) {
    res.json({status:500,message:"Internal server error"});
   }
})

// get Single Category

export let getSingleBrand = asynchandler(async(req,res)=>
{
   try {
    let findSingleBrand = await brandModel.findById({_id:req.params.id});
    if(findSingleBrand)
    {
        res.json({status:200,message:findSingleBrand});
    }
    else
    {
        res.json({status:400,message:"Single brand not find"});
    }
   } catch (error) {
    res.json({status:500,message:"Internal server error"});
   }
})

// update Category

export let updatebrand = asynchandler(async(req,res)=>
{
    try {
        let brandUpdate = await brandModel.findByIdAndUpdate({_id:req.params.id},{$set:req.body});
        if(brandUpdate )
        {
            res.json({status:200,message:"Brand update successfully"});
        }
        else
        {
            res.json({status:400,message:"Brand not update"});
        }
    } catch (error) {
        res.json({status:500,message:"Internal server error"});
    }
})


// delete Category

export let deleteBrand = asynchandler(async(req,res)=>
{
    try {
        let branddelete = await brandModel.deleteOne({_id:req.params.id});
        if(branddelete)
        {
            res.json({status:200,message:"Brand delete successfully"});
        }
        else
        {
            res.json({status:400,message:"Brand not delete"});
        }
    } catch (error) {
        res.json({status:500,message:"Internal server error"});
    }
})
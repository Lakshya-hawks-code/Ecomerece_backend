import userModel from "../Models/userModel.js"
import jwt from "jsonwebtoken";
import asynchandler from "express-async-handler";

export const authMiddleWare = asynchandler(async(req,res,next)=>
{ 
    if(req?.headers?.authorization?.startsWith("Bearer"))
    {
      let token = req.headers.authorization.split(" ")[1]
      try {
        if(token)
        {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decode);
            const user = await userModel.findById(decode?.id);
            req.user = user
            next();
        }

      } catch (error) {
           res.json({status:401,message:"Unauthorized - Invalid token"})
      }
    }
    else
    {
       res.json({status:409,message:"Unauthorized - No token provided in header"})
        
    }
})

// export const isAdmin = asynchandler(async(req,res,next)=>
// {
//   const email = req.user;
//   const adminUser = await userModel.findOne({email});
//   if(adminUser.role !== "admin")
//   {
//     throw new Error("you are not an admin");
//   }
//   else
//   {
//     next();
//   }
// })


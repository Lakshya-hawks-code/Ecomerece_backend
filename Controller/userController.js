import userModel from "../Models/userModel.js";
import asyncHandler from "express-async-handler"
import jwt, { decode } from "jsonwebtoken";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import { sendemail } from "./emailPass.js";
import {nodemailerEmail} from "./nodeMailerEmail.js"
import takeScreenShot from "./takeScreenShot.js";
import generatePDF from "./generatePdf.js"

 // Register User
export let registerUser = asyncHandler(async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let findUser = await userModel.findOne({ email: email });
    
    if (!findUser) {
        let request = req.body;
        let salt = crypto.randomBytes(16).toString("hex");
        let hashpassword = await crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
        request.password = hashpassword;
        request.salt = salt; // Corrected line to store salt
        let newparams = 
        {
            firstname:request ?.firstname,
            lastname:request ?.lastname,
            email:request?.email,
            address:request ?.address,
            mobile:request ?.mobile,
            password:request ?.password,
            salt:request ?.salt
        }
        
        let createuser = await userModel.create(newparams);
        
        if (createuser) {
            await createuser.save();
            res.json({ status: 200, message: "User Register Successfully" });
        } else {
            res.json({ status: 400, message: "User not register" });
        }
    } else {
        res.json({ status: 404, message: "User already register" });
    }
});

// Login User

export let loginUser = asyncHandler(async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
  
    let existingUser = await userModel.findOne({ email: email });
  
    if (existingUser) {
      // Hash the provided password with the stored salt
      let hashedPassword = crypto
        .pbkdf2Sync(password, existingUser.salt, 1000, 64, 'sha512')
        .toString('hex');
  
      // Compare the hashed password with the stored hashed password
      if (hashedPassword === existingUser.password) {
        const refreshToken = await generateRefreshToken(existingUser?._id);
        const userUpdate = await userModel.findByIdAndUpdate(existingUser.id,
            {
                refreshToken : refreshToken
            },
            {
                new : true,
            });
            res.cookie("refreshToken",refreshToken,
            {
                httpOnly:true,
                maxAge:72 * 60 * 60 * 1000,
            })
         res.json({
            status:200,
            message:"User login successfully",
            data: ({
            _id:existingUser?._id,
            firstname:existingUser?.firstname,
            lastname:existingUser?.lastname,
            email:existingUser?.email,
            mobile:existingUser?.mobile,
            token:generateToken(existingUser?._id)
         })})
      } else {
        res.json({ status: 400, message: 'Incorrect password' });
      }
    } else {
      res.json({ status: 404, message: 'User not found' });
    }
  });



// get All User 

export const getAllUser = asyncHandler(async(req,res)=>
{
    try {
        const getalluser = await userModel.find();
        if(getalluser)
        {
            res.json({status:200,message:getalluser});
        }
        else
        {
            res.json({status:400,message:"All user not get"})
        }
        
    } catch (error) {
        res.json({status:500,message:"Internal Server error"});
    }
})

// get Single User

export const getSingleUser = asyncHandler(async(req,res)=>
{
   try {
    const getsingleuser = await userModel.findOne({_id:req.params.id})
   if(getsingleuser)
   {
    res.json({status:200,message:getsingleuser});
   }
   else
   {
    res.json({status:400,message:"Single user not find"})
   }
   } catch (error) {
    res.json({status:500,message:"Internal server error"});
   }
})

// delete User
export const deleteUser = asyncHandler(async(req,res)=>
{
    try {
        const deleteuser = await userModel.deleteOne({_id:req.params.id})
        if(deleteuser)
        {
            res.json({status:200,message:"Delete data successfully"});
        }
        else
        {
            res.json({status:400,message:"data not delete"})
        }
    } catch (error) {
        res.json({status:500,message:"Internal server error"});
    }
}) 

// update User

export const updateUser = asyncHandler(async(req,res)=>
{
    try {
        const updateuser = await userModel.findByIdAndUpdate({_id:req.params.id},{$set:req.body});
        if(updateuser)
        {
            res.json({status:200,message:"Update data successfully"});
        }
        else
        {
            res.json({status:400,message:"User Not update"})
        }
    } catch (error) {
        res.json({status:500,message:"Internal Server error"});
    }
})


// Block User

export const blockUser = asyncHandler(async(req,res)=>
{
    const { id } = req.params
    try {
        const user = await userModel.findById(id);
    if(!user)
    {
       res.json({status:404,message:"User Not Found"})
    }
    user.blockStatus = 'blocked';

    await user.save();

    res.json({status:201,message:"User Block Successfully"})
    } catch (error) {
        console,log(error);
        res.status(500).json({error:"Internal server error"});
        
    }
})

 // UnBlock User 

export const  unBlockUser = asyncHandler(async(req,res)=>
{
    const { id } = req.params
    try {
        const user = await userModel.findById(id);
    if(!user)
    {
        res.json({status:404,message:"User Not Found"})
    }
    user.blockStatus = 'unblocked';

    await user.save();

    res.json({status:201,message:"User UnBlock successfully"})
    } catch (error) {
        console,log(error);
        res.json({status:500,error:"Internal server error"});
        
    }
})


// handle refresh token

export const handleRefresToken = asyncHandler(async(req,res) =>
{
    const cookie = req.cookies;
    if(!cookie.refreshToken)
    res.json({status:401,message:"there is no token in cookie"});
    const refreshToken = cookie.refreshToken;
    const user = await userModel.findOne({refreshToken});
    if(!user)
    throw new Error({status:400,message:"there is no toekn in db"});
    jwt.verify(refreshToken,process.env.JWT_SECRET,(error,decode)=>
    {
        if(error || !user.id == decode.id)
        {
            res.json({status:500,message:"Something went wrong in token"});
        }
        else
        {
            const accesstoken = generateToken(user?._id)
            res.json({accesstoken});
        }
    })
})   


 
// Logout function

export const logout = asyncHandler(async(req,res)=>
{
     const cookie = req.cookies;
     if(!cookie?.refreshToken)
     res.json({status:401,message:"there is no token"});
     const refreshToken = cookie.refreshToken;
     const user = await userModel.findOne({refreshToken});
     if(!user)
     {
        res.clearCookie("refreshToken",
        {
            httpOnly:true,
            secure:true
        })
        return res.sendStatus(204);
     }
     await userModel.findOneAndUpdate(
        { refreshToken: refreshToken }, // Filter
        { $set: { refreshToken: "" } }, // Update
        { new: true } // Return the modified document
        )
       res.clearCookie("refreshToken",
       {
        httpOnly:true,
        secure:true
       })
       res.sendStatus(201);
})



 // Change Password
export let changePassword = asyncHandler(async(req,res)=>
{
    let userId = req.params.id;
    let {oldPassword, newPassword} = req.body;
    let findUser = await userModel.findById(userId)
    if(findUser)
    {
      let hashPassword = crypto.pbkdf2Sync(oldPassword,findUser.salt,1000,64,"sha512").toString("hex");
      if(hashPassword === findUser.password)
      {
        let newSalt = crypto.randomBytes(16).toString("hex");
        let newHashedPassword = crypto.pbkdf2Sync(newPassword, newSalt,1000,64,"sha512").toString("hex");

        findUser.salt = newSalt;
        findUser.password = newHashedPassword;
        await findUser.save();
        res.json({status:201,message:"Password Change Successfully"});
      }
      else
      {
        res.json({status:400,message:"Incorrect Current Password"});
      }
    }
    else
    {
      res.json({status:500,message:"Internal Server Error"});
    }
})


// ForgetPasswordToken
export let forgetPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const findUser = await userModel.findOne({ email });

        // If user not found, return an error response
        if (!findUser) {
            return res.json({ status: 404, message: "User not found" });
        }

        // Generate a unique reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Set an expiration time for the reset token if needed
        const tokenExpiration = Date.now() + 600000; // 10 minutes

        // Update the user with the reset token and expiration time
        findUser.resetToken = resetToken;
        findUser.tokenExpiration = tokenExpiration;

        // Save the user with the updated reset token details
        await findUser.save();

        // Send the reset token to the user via email or other means
        // You may use a dedicated library or service for sending emails
        const resetUrl = `Hi please follow this link to reset your password. This link is valid till 10 minute from now. <a href ='http://localhost:5000/forgot-password-token/${resetToken}'>Click Here</>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            html: resetUrl,
        };
        sendemail(data);

        res.json({ status: 200, message: resetToken });
    } catch (error) {
        res.json({ status: 500, error:"Internal server error" });
    }
});



// Reset Password
export let resetPassword = asyncHandler(async (req, res) => {
    let token = req.params.token; // Corrected to access the token parameter
    let newPassword = req.body.newPassword; // Corrected to access the newPassword in the request body
  
    let findUser = await userModel.findOne({
      resetToken: token,
      tokenExpiration: { $gt: Date.now() },
    });
  
    if (!findUser) {
      return res.json({ status: 404, message: "Invalid token or user not found" });
    }
  
    try {
      let newSalt = crypto.randomBytes(20).toString('hex'); // Corrected to generate random bytes
      let hashPassword = crypto.pbkdf2Sync(
        newPassword,
        newSalt,
        1000,
        64,
        'sha512'
      ).toString('hex');
  
      findUser.newSalt = newSalt;
      findUser.password = hashPassword;
      findUser.resetToken = undefined; // Reset the resetToken after successful password change
      findUser.tokenExpiration = undefined; // Reset the tokenExpiration after successful password change
  
      await findUser.save(); // Save the updated user
  
      res.json({ status: 201, message: "Password changed successfully" });
    } catch (error) {
      res.json({ status: 500, message:"Internal server error" });
    }
  });

  // Email Send Using Nodemailer

  export let emailSend = asyncHandler(async(req,res)=>
  {
    const { to, subject, text, html} = req.body;
    try {
        await nodemailerEmail ({to,subject,text,html},req,res)
        res.json({status:200,message:"Email Sent Successfully"});
    } catch (error) {
        res.json({status:500,message:error.message})
    }
  });

  // Email send using SendGrid
   
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  export let emailSendGrid = asyncHandler(async(req,res)=>
  {
    try {
        const {to,subject,text,html} = req.body;
        const msg = 
        {
            to,
            from:"lakshyasharma.hawkscode@gmail.com",
            subject,
            text,
            html
        }
        await sgMail.send(msg);
        res.json({status:200,message:"Message sent successfully"});
    } catch (error) {
        res.json({status:500,message:error.message});
    }
  })

  // Screen Shot Using Puppeteer

  export const ScreenShot = async (req, res) => {
    try {
      const screenshotPath = await takeScreenShot(req, res);
      res.status(200).json({ success: true, screenshotPath });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

  // pdf Generate Using Puppeter

export const pdfGenerate = asyncHandler(async(req,res)=>
{
    try {
        const pdfGeneratePath = await generatePDF(req, res);
        res.json({status:200,message:"Pdf generate successfully",pdfGeneratePath})
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
      }
}) 
 

//   Create a JWT token
export const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };


  // Refresh Token

 export const generateRefreshToken = (_id) =>
 {
    return jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:"3d"})
 }
 
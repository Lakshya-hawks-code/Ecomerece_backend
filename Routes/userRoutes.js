import express from "express";
let router = express.Router();
import {
    registerUser,
    loginUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    blockUser,
    unBlockUser,
    handleRefresToken,
    logout,
    changePassword,
    forgetPasswordToken,
    resetPassword,
    emailSend,
    ScreenShot,
    pdfGenerate  
}
from "../Controller/userController.js"
import {
    authMiddleWare
} from "../Middleware/authMiddleWare.js"



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/findalluser",authMiddleWare, getAllUser);
router.get("/findsingleuser/:id", authMiddleWare, getSingleUser);
router.delete("/deleteuser/:id",authMiddleWare, deleteUser);
router.put("/updateuser/:id", authMiddleWare, updateUser);
router.put("/block-user/:id", authMiddleWare, blockUser);
router.put("/unblock-user/:id", authMiddleWare, unBlockUser);
router.get("/refreshToken",authMiddleWare, handleRefresToken);
router.get("/logout",authMiddleWare, logout);
router.put("/changepassord/:id",changePassword);
router.post("/forgot-password-token",forgetPasswordToken);
router.put("/reset-password/:token",resetPassword);
router.post("/sendEmail",emailSend);
router.get("/screenShot",ScreenShot);
router.post("/generate-pdf",pdfGenerate)





export default router;
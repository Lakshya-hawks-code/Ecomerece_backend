import express from "express";
const router = express.Router();
import
 {
    createCategory
    ,getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
 } from "../Controller/productCatCtr.js";
 import { authMiddleWare } from "../Middleware/authMiddleWare.js";

router.post("/createCategory",authMiddleWare,createCategory);
router.get("/findAllCategory",authMiddleWare,getAllCategory);
router.get("/findSingleCategory/:id",authMiddleWare,getSingleCategory);
router.put("/updateCategory/:id",authMiddleWare,updateCategory);
router.delete("/deleteCategory/:id",authMiddleWare,deleteCategory);

export default router; 
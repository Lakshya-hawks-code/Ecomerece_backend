import express from "express";
const router = express.Router();
import {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct  
}
from "../Controller/productController.js"
import { authMiddleWare } from "../Middleware/authMiddleWare.js";

router.post("/createproduct",authMiddleWare, createProduct);
router.post("/findAllProduct",getAllProduct);
router.get("/findSingleProduct/:id",authMiddleWare,getSingleProduct);
router.put("/updateProduct/:id",authMiddleWare,updateProduct);
router.delete("/deleteProduct/:id",authMiddleWare,deleteProduct)

export default router;
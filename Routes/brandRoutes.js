import express from "express";
const router = express.Router();
import
 {
    createBrand, 
    getAllBrand,
    getSingleBrand,
    updatebrand,
    deleteBrand
}
 from "../Controller/brandControler.js";
 import { authMiddleWare } from "../Middleware/authMiddleWare.js";

router.post("/createbrand",authMiddleWare,createBrand);
router.get("/findallbrands",authMiddleWare,getAllBrand);
router.get("/findsinglebrand/:id",authMiddleWare,getSingleBrand);
router.put("/updatebrand/:id",authMiddleWare,authMiddleWare,updatebrand);
router.delete("/deletebrand/:id",authMiddleWare,deleteBrand);

export default router;
import express from "express";
let router = express.Router();
import {
    blogcreate,
    getAllBlog,
    getsingleblog,
    updateblog,
    deleteblog,
    likeblog,
    dislikeblog
}
from "../Controller/blogController.js";
import {
    authMiddleWare
} from "../Middleware/authMiddleWare.js";


router.post("/createblog", authMiddleWare, blogcreate);
router.get("/findallblog",authMiddleWare,getAllBlog);
router.get("/findsingleblog/:id",authMiddleWare,getsingleblog);
router.put("/updateblog/:id",authMiddleWare,updateblog);
router.delete("/deleteblog/:id",authMiddleWare,deleteblog);
router.post("/likeblog/:id",authMiddleWare,likeblog);
router.post("/dislikeblog/:id",authMiddleWare,dislikeblog);

                                 
export default router;
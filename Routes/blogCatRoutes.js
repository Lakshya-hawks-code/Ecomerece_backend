import express from "express";
const router = express.Router();

import {
  createBlogCategory,
  getAllBlogCategory,
  getSingleBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} from "../Controller/blogCatCtr.js";
import { authMiddleWare } from "../Middleware/authMiddleWare.js";

router.post("/createBlogCat", authMiddleWare, createBlogCategory);
router.get("/findBlogCat", authMiddleWare, getAllBlogCategory);
router.get("/findSingleBlog/:id", authMiddleWare, getSingleBlogCategory);
router.post("/updateBlogCat/:id", authMiddleWare, updateBlogCategory);
router.delete("/deleteBlogCat/:id", authMiddleWare, deleteBlogCategory);

export default router;

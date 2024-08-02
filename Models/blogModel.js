import mongoose from "mongoose";
let blogSchema = new mongoose.Schema
({
    title:
    {
        type: String,
        required: true,
    },
    description:
    {
      type: String,
      required: true,
    },
    category:
    {
      type: String,
      required: true,
    },
    plateform:
    {
        type: String,
      required: true,
    },
    numViews:
    {
        type: Number,
        default: 0,
    },
    isLiked:
    {
        type: Boolean,
        default: false,
    },
    isDisliked:
    {
        type: Boolean,
        default: false,
    },
    likes:
    [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
],
    dislikes:
    [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
],
    image:
    {
        type:String,
        default:"https://thumbs.dreamstime.com/b/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg"
    },
    author:
    {
        type:String,
        default:"Admin",
    },
},
{
    toJSON:
    {
        virtuals:true
    },
    toObject:
    {
        virtuals:true
    },
    timestamps:true
})

let blogModel = mongoose.model("Blog",blogSchema);
export default blogModel;



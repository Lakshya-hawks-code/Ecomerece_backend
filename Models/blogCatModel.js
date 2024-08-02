import mongoose from "mongoose";
const blogcatSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    unique: true,
  },
},
{
    timestamps:true
});

let blogcatModel = mongoose.model("BlogCat",blogcatSchema);
export default blogcatModel;
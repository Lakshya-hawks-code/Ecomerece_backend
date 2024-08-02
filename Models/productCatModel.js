import mongoose from "mongoose";
const productcatSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    unique: true,
  },
},
{
    timestamps:true
});

let productcatModel = mongoose.model("ProductCat",productcatSchema);
export default productcatModel;
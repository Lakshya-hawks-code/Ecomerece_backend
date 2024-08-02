import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
    unique: true,
  },
},
{
    timestamps:true
});

let brandModel = mongoose.model("Brand",brandSchema);
export default brandModel;
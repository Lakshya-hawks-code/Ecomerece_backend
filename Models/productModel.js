import mongoose from "mongoose";

const productSchema = new mongoose.Schema
({
    title:
    {
      type:String,
      required:true,
      trim:true,
    },
    slug:
    {
        type:String,
        required: true,
        unique: true,
        lowercase:true
    },
    description:
    {
        type:String,
        required:true,
        unique:true
    },
    price:
    {
        type:Number,
        required:true,
    },
    category:
    {
        type:String,
        required:true,
    },
    qunatity:
    {
        type:Number,
        required:true
    },
    sold:
    {
        type:Number,
        default:0,
        select:false
    },
    images:
    {
        type:Array
    },
    brand:
    {
        type:String,
        required:true,
    },
    color:
    {
        type:String,
        required:true,
    },
    ratings:
    [{
        star:Number,
        postedby:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }]
},
{
    timestamps:true
})

const productModel = mongoose.model("product",productSchema);
export default productModel
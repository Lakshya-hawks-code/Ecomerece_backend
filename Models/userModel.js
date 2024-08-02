import mongoose from "mongoose";
const userSchema = new mongoose.Schema
({
    firstname:
    {
        type:String,
        // required: true,
    },
    lastname:
    {
        type:String,
        // required:true,
    },
    email:
    {
        type:String,
        // required:true,
        // unique: true,
    },
    mobile:
    {
        type:String,
        // required:true,
        // unique:true,
    },
    password:
    {
        type:String,
        // required:true,
    },
    salt:
    {
        type:String,
        required:true
    },
    role:
    {
        type:String,
        default:"user",
    },
    blockStatus: 
    { 
      type: String,
      required: true,
      enum: ['blocked', 'unblocked'],
      default: 'unblocked'
     },
    cart:
    {
        type: Array,
      default: [],
    },
    address:
    {
        type: String,
    },
    wishList:
    [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product"
     }],
     refreshToken:
     {
        type:String
     },
     resetToken: {
        type: String,
    },
    tokenExpiration: {
        type: Date,
    },
},{
    timestamps:true,
})

const userModel = mongoose.model("User",userSchema);
export default userModel;

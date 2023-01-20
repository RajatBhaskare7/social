import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        min:3,
        max:20

    },
    lastname:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:10,
    },
    picturePath:{
        type:String,
        required:true,
        default:""

    },
    friends:{
        type:Array,
        default:[]

    },
    location:String,
    occupation:String,
    viewProfie:Number,
    impressions:Number,



    },
    {timestamps:true}
);

const User = mongoose.model("User", userSchema);
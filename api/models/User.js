const mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true,
    },password:{
        type:String,
        require:true,
        min:6,
        unique:true,
    },
    profilePicture:{
        type:String,
        default:"",

    },
    coverPicture:{
        type:String,
        default:"",

    },
    followers:{
        type:Array,
        default:[],

    },
    followings:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    description:{
        type:String,
        max:50,
    },
    city:{
        type:String,
        max:50,
    },
    relationship:{
        type:Number,
        enum:[1,2,3],
    },
},{timestamps:true})

const User = mongoose.model("User", UserSchema);
module.exports = User
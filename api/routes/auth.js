const router = require("express").Router();
const bcrypt = require("bcrypt")

const User = require("../models/User")

router.post("/register", async(req,res)=>{
    const {username, email, password} = req.body;
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await new User({
            username, email, password:hashedPassword
        })
        await user.save();
        res.status(200).json({message:"ok", user:user})
    }catch(err){
        res.status(404).json(err)
    }
})

router.post("/login", async(req,res)=>{
    const {email, password}  = req.body;
    try{
        const user = await User.findOne({email:email})
        if(!user) return  res.status(404).json({message:"no user found" })
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
           return  res.status(404).json({message:"password is incorrect"});
        }
        res.status(200).json({message:"successfully login", user:user});
    }catch(err){
        res.status(404).json({message:"some error", err:err})
    }
})




module.exports = router
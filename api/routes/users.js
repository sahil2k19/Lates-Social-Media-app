const User = require("../models/User");
const bcrypt =require("bcrypt")
const router = require("express").Router();

//UPDATE USER

router.put("/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId,password}  = req.body;
        if(id === userId){
            if(password){
                try{
                    const salt  = await bcrypt.genSalt(10);
                    const newPassword = await bcrypt.hash(password,salt);
                    req.body.password = newPassword
                }catch(err){
                    return res.status(500).json({message:"error ", err:err});
                }
            }
            const user = await User.findByIdAndUpdate(id,
                {$set:req.body},{new:true}
            );
            if(!user) return res.status(404).json("user not found ");
            res.status(200).json({message:"account updated ", user:user})
    }else{
        res.status(404).json("id not match")
    }
    }catch(err){
        if(err.codeName === "DuplicateKey"){
            return res.status(500).json({message:"user already exist"})
        }
        res.status(500).json({message:"error ", err:err});
    }

    

})

// DELETE USER
router.delete("/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId}  = req.body;
        if(id === userId){ssssssss
          const user =  await User.deleteOne({_id:id});
            res.status(200).json("account delete successfullly")
        }else{
            res.status(404).json("u can delete only your account")
        }
    }catch(err){
       
        res.status(500).json({message:"error ", err:err});
    }

    

})

// GET A USER

router.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const user = await User.findById(id).select("-password -createdAt -updatedAt");;
        if(!user) return res.status(404).json("user not found");
        console.log(user);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);

    }
})

// FOLLOW USER

router.put("/:id/follow", async(req,res)=>{
    const {id} =  req.params;
    const {userId} = req.body;
    if(id !== userId){
        try{
            const  user = await User.findOne({_id:id});
            const  currentUser = await User.findOne({_id:userId});
            if(!user.followers.includes(userId)){
                user.followers.push(userId);
                currentUser.following.push(id);
            }else{
                res.status(403).json("already follow");
            }
        }catch(err){
            res.status(403).json(err);
        }
    }else{
        res.status(400).json("you cant follow urself");
    }
})

// UNFOLLOW USER


module.exports = router
const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// get all post

// router.get("/", async(req, res)=>{
//     try{
//         const post  = await Post.find();
//         res.status(200).json(post);
//     }catch(err){
//         res.status(500).json(err);

//     }
// })

//get a post

router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//create a post

router.post("/",async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});

// update a post


router.put("/:id", async(req,res)=>{
    const {id}  = req.params;
    const {userId} = req.body;
    try {
        const post = Post.findById(id);
        if(post.userId === userId){
            await post.updateOne({$set:req.body},{new:true});
            res.status(200).json({message:"the post has been update", post:post});
        }
        else{
            res.status(403).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete a  post 

router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   like/dislike a post


router.put("/:id/like", async(req,res)=>{
    try{
        const {userId} = req.body;
        const {id}  = req.params;
        const post =await Post.findById(id);
        if(post.likes.includes(userId)){
            post.likes.pull(userId);
            await post.updateOne({likes:post.likes},{new:true})
            res.status(200).json({message:"The post has been disliked",post:post});
        }else{
            post.likes.push(userId);
            await post.updateOne({likes:post.likes},{new:true})
            res.status(200).json({message:"The post has been liked",post:post});
        }
    }catch(err){
        res.status(500).json(err);
    }
})


//get timeline posts

router.get("/timeline/all", async (req, res) => {
    const {userId} = req.body;
    try {
        const currentUser = await User.findById(userId);
        const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return  Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
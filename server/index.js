import express from "express";
import mongoose from "mongoose";
import cors from "cors";
//Import the UserModel in index.js
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";
import dotenv from 'dotenv'

const app= express();
app.use(express.json())
app.use(cors());
dotenv.config();
//registerUser---> End Point 
app.post("/registerUser", async(req,res)=>{
    //reqest have a boday that containt name,email,password whech is from userModel
     try{
        const {name,email,password}=req.body
     const user=new UserModel({name,email,password})
     await user.save()
     //resposes ---> will send the user data and display the message that the data is add on the DB
     res.send({user:user,msg:" User Data is Added"});
     }
     catch(error){
        res.status(400).json({error:"Unexpected error occured"});
     }
});
app.post("/login", async (req,res) => { 
  try { 
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email:email,password:password });

    if (!user) { 
      res.status(500).send({ msg: " Couldn't find the user" });

    }
    else if (user.password !== password) {
      res.status(500).json({ msg: "Password is incorrect" });
    }
    else {
      res.status(200).json({user:user,msg:"Authentication is  successfull"})
    }
  }
  catch (error) { 
    res.status(500).json({error:"An unexpected error occurred"})
  }

 })
 app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

app.post("/savePost", async(req,res)=>{
  try{
    const {postMsg,email}=req.body
    const post = PostModel({postMsg,email})
    post.save({post:post,msg:"Post is saved"})
  }
  catch(error){
    res.status(400).json({error:"An unexpected error occurred"})
  }
})

//GET API - getPost
app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt(from the DBs) in descending order //1 is ascending order 
    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    const countPost = await PostModel.countDocuments({}); //How many posts in the collection

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.put("/likePost/:postId/", async (req, res) => {
  const postId = req.params.postId; //Extract the ID of the post from the URL
  const userId = req.body.userId;

  try {
 

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.put("/likePost/:postId/", async (req, res) => {
 // const postId = req.params.postId; //Extract the ID of the post from the URL
  //const userId = req.body.userId;
  //const{userId,postId}=req.body
  try {
    const{userId,postId}=req.body
    const postToUpdate = await PostModel.findOne({ _id: postId });
    console.log(postToUpdate)
    res.send(postToUpdate)
    //Search the user Id from the array of users who liked the post.
    const userIndex = postToUpdate.likes.users.indexOf(userId);
    //indexOf method returns the index of the first occurrence of a specified value in an array.
    //If the value is not found, it returns -1.
    //This code will toogle from like to unlike
    if (userIndex === -1) {
      const udpatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count":1}, // Decrement the like count $inc and $pull are update operators
          $addToSet: { "likes.users":userId}, // Remove userId from the users array
        },
        { new: true } // Return the modified document
      );
      res.json({ post: udpatedPost, msg: "Post liked." });
    }
    else{
      // User hasn't liked the post, so like it
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count":-1 }, // Increment the like count
          $pull: { "likes.users": userId }, // Add userId to the users array if not already present
        },
        { new: true } // Return the modified document
      );

      res.json({ post: updatedPost, msg: "Post unliked." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});



/*const connectString="mongodb+srv://admin:csse4103@postitcluster.rbi5vqf.mongodb.net/postITDb?retryWrites=true&w=majority&appName=PostITCluster";
mongoose.connect(connectString);*/


const connectString=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@postitcluster.rbi5vqf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=PostITCluster`;
mongoose.connect(connectString);


//app.lissten  ---> listeng througg port 3001
/*app.listen(3001,()=>{
    console.log("you are connected")
})*/
{/*the way of connect the app to public by useing Environment Variables */}
app.listen(process.env.PORT,()=>{
  console.log("you are connected")
})
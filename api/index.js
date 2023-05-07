const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts");
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("mongodb Connected")).catch((err)=>console.log(err,"here is some error"));



// ---------------------------MIDDLEWARE-------------------------------

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

// -------------------------------ROUTES---------------------------------

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute);

app.get("/",(req,res)=>{
    res.send("hi sahil")
})


app.listen(8800, (req,res)=>{
    console.log("backend server is running on ", 8800);
})

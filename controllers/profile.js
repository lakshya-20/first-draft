import {requireAPIKey, requireLogin} from '@/utils/requestValidators';
const User = require("@/models/user");
const Blog = require("@/models/blog");

export const getProfile = async (req,res,id) =>{
    if(! await requireAPIKey(req, res)){
        return res.status(401).json({error: "Access denied"})
    }
    try{
        const user = await User.findById(id,{password:0, email:0})
        .populate("blogs","_id title description createdAt img_header");
        return res.status(200).json(user);
    } catch(err){
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const updateProfile = async (req, res) =>{
    if(!(await requireAPIKey(req, res)&&await requireLogin(req,res))){
        return res.status(401).json({error: "Access denied"})
    }
    try{
        const userId = req.user._id;
        var user = await User.find({email:req.body.email});
        if(user && req.body.email!==req.user.email){
            return res.status(422).json({error:"This email is already taken"});
        }
        user = await User.findById(userId);
        if(!user){
            return res.status(422).json({error:"Invalid Request"});
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.dp = req.body.dp;
        user = await user.save();
        return res.status(200).json(user);
    } catch(err){
        console.log(err)
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const deleteProfile = async (req,res) =>{
    if(!(await requireAPIKey(req, res)&&await requireLogin(req,res))){
        return res.status(401).json({error: "Access denied"})
    }
    const session = await User.startSession();
    session.startTransaction();
    try{
        const userId = req.user._id;
        const user = await User.findByIdAndDelete(userId);
        const blogIds = user.blogs;
        blogIds.forEach(async (id)=>{
            await Blog.findByIdAndDelete(id);
        })
        await session.commitTransaction();
        session.endSession();
        res.status(200).send("Profile Delete Successfull");
    } catch(err){
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({error: "Internal Server Error"});
    }
}
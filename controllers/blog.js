import {newBlogvalidator} from '../utils/dataValidators';
import {requireAPIKey, requireLogin} from '../utils/requestValidators';
const Blog = require('../models/blog');
const User = require('../models/user');
export const getAllBlogs = async (req,res) =>{
    if(! await requireAPIKey(req, res)){
        return res.status(401).json({error: "Access denied"})
    }
    try{
        const blogs = await Blog.find().sort({createdAt:'desc'}).limit(10).populate("postedBy","_id name dp");;
        return res.status(200).json(blogs);
    }catch(err){
        throw err;
    }
}

export const getBlog = async (req,res,id) =>{
    if(! await requireAPIKey(req, res)){
        return res.status(401).json({error: "Access denied"})
    }
    try{
        const blog = await Blog.findById(id)
        .populate("postedBy","_id name dp about socialLinks");
        return res.status(200).json(blog);
    }catch(err){
        throw err;
    }
}

export const addBlog = async (req,res) =>{
    if(!(await requireAPIKey(req, res)&&await requireLogin(req,res))){
        return res.status(401).json({error: "Access denied"})
    }
    const {title, description, markdown} = req.body;
    const {errors, valid} = newBlogvalidator(title,description,markdown);
    if(!valid){
        return res.status(422).send({error:Object.values(errors)[0]});
    }
    const session = await User.startSession();
    session.startTransaction();
    try{
        const userId = req.user._id;
        req.body.postedBy = userId;
        var blog = new Blog(req.body);
        blog = await blog.save();
        await User.findByIdAndUpdate(userId,{
            $push:{blogs:blog._id}
        });
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json(blog);
    } catch(err){
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
}

export const updateBlog = async (req, res, id) =>{
    if(!(await requireAPIKey(req, res)&&await requireLogin(req,res))){
        return res.status(401).json({error: "Access denied"})
    }
    const {title, description, markdown} = req.body;
    const {errors, valid} = newBlogvalidator(title,description,markdown);
    if(!valid){
        return res.status(401).send({error:Object.values(errors)[0]});
    }
    try{
        var blog = await Blog.findById(id);
        if(!blog){
            return res.status(422).json({error:"Invalid Request"})
        }
        blog.title = req.body.title;
        blog.description = req.body.description;
        blog.markdown = req.body.markdown;
        blog.img_header = req.body.img_header;
        blog = await blog.save();
        return res.status(200).json(blog);
    }catch(err){
        throw err;
    }
}

export const deleteBlog = async (req,res,id) =>{
    if(!(await requireAPIKey(req, res)&&await requireLogin(req,res))){
        return res.status(401).json({error: "Access denied"})
    }
    const session = await User.startSession();
    session.startTransaction();
    try{
        const userId = req.user._id;
        const blog = await Blog.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{
            $pull:{blogs:blog._id}
        })
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({message:"Blog Delete Successful"});
    } catch(err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }

}

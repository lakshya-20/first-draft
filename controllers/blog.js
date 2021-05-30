import {newBlogvalidator} from '../utils/validators';
import {requireAPIKey, requireLogin} from '../utils/requestValidators';
const Blog = require('../models/blog');

export const getAllBlogs = async (req,res) =>{
    if(! await requireAPIKey(req, res)){
        return res.status(401).json({error: "Access denied"})
    }
    try{
        const blogs = await Blog.find().sort({createdAt:'desc'}).limit(10);
        return res.status(200).json(blogs);
    }catch(err){
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export const getBlog = async (req,res,id) =>{
    if(! await requireAPIKey(req, res)){
        return res.status(401).json({error: "Access denied"})
    }
    try{
        const blog = await Blog.findById(id)
        .populate("postedBy","_id name dp");
        return res.status(200).json(blog);
    }catch(err){
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export const addBlog = async (req,res) =>{
    if(!(await requireAPIKey(req, res)&&await requireLogin(req,res))){
        return res.status(401).json({error: "Access denied"})
    }
    const {title, description, markdown} = req.body;
    const {errors, valid} = newBlogvalidator(title,description,markdown);
    if(!valid){
        return res.status(401).send({error:Object.values(errors)[0]});
    }
    try{
        req.body.postedBy = req.user._id;
        var blog = new Blog(req.body)
        blog= await blog.save();                
        return res.status(200).json(blog);
    }catch(err){
        return res.status(500).json({error:"Internal Server Error"});
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
        blog = await blog.save();
        return res.status(200).json(blog);
    }catch(err){
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export const deleteBlog = async (req,res,id) =>{
    if(!(await requireAPIKey(req, res)&&await requireLogin(req,res))){
        return res.status(401).json({error: "Access denied"})
    }
    try{
        await Blog.findByIdAndDelete(id);
        return res.status(200).send("Blog Delete Successful");
    }catch(err){
        return res.status(500).json({error:"Internal Server Error"});
    }
}

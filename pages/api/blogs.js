const mongoose = require('mongoose');
const Blog = require('../../models/blog');
import {getAllBlogs, getBlog, addBlog, updateBlog, deleteBlog} from '../../controllers/blog';

export default async function handler (req, res){
    const {query: {id}, method} = req
    const mongoURL = process.env.mongoURL;    
    mongoose.connect(mongoURL, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    })
    switch(method){
        case "GET": {
            try{
                if(id){
                    return getBlog(req, res, id);  
                }
                else{      
                    return getAllBlogs(req, res);
                }
            }catch(err){                 
                res.status(500).json({error:err.message});
            }
            break;
        }
        case "PUT" : {
            try{     
                return updateBlog(req, res, id);
            }catch(err){                
                res.status(500).json({error:err.message});
            }
            break;
        }
        case "POST": {
            try{                                
                return addBlog(req,res);
            }catch(err){                
                res.status(500).json({error:err.message});
            }
            break;
        }
        case "DELETE": {
            try{                
                return deleteBlog(req,res,id);
            }catch(err){
                res.status(500).json({error:err.message});
            }
            break;
        }
        default:{
            res.send(400).send("Invalid request");
        }
    }
}
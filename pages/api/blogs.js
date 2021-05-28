const mongoose = require('mongoose');
const Blog = require('../../models/blog');

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
                    const blog = await Blog.findById(id);                    
                    res.status(200).json(blog);            
                }
                else{                    
                    const blogs = await Blog.find().sort({createdAt:'desc'});
                    //console.log(JSON.stringify(blogs))
                    res.status(200).json(blogs);
                }
            }catch(err){                 
                //res.status(500).send("Server Error");                
                res.status(500).json({error:err.message});
            }
            break;
        }
        case "PUT" : {
            try{                
                var blog = await Blog.findById(req.body._id);
                blog.title = req.body.title;
                blog.description = req.body.description;
                blog.markdown = req.body.markdown;
                blog = await blog.save();
                res.status(200).json(blog);
            }catch(err){
                //res.status(500).send("Server Error");
                res.status(500).json({error:err.message});
            }
            break;
        }
        case "POST": {
            try{                                
                var blog = new Blog(req.body)
                blog= await blog.save();                
                res.status(200).json(blog);
            }catch(err){
                //res.status(500).send("Server Error");
                res.status(500).json({error:err.message});
            }
            break;
        }
        case "DELETE": {
            try{                
                await Blog.findByIdAndDelete(req.body._id);
                res.status(200).send("Blog Delete Successful");
            }catch(err){
                //res.status(500).send("Server Error");
                res.status(500).json({error:err.message});
            }
            break;
        }
        default:{
            res.send(400).send("Invalid request");
        }
    }
}
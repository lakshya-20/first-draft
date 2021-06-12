const mongoConenction = require('@/utils/mongoConnection');
import {getAllBlogs, getBlog, addBlog, updateBlog, deleteBlog} from '@/controllers/blog';

export default async function handler (req, res){
    const {query: {id}, method} = req
    mongoConenction()
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
                res.status(500).json({error:"Internal Server Error"});
            }
            break;
        }
        case "PUT" : {
            try{     
                return updateBlog(req, res, id);
            }catch(err){                
                res.status(500).json({error:"Internal Server Error"});
            }
            break;
        }
        case "POST": {
            try{        
                return addBlog(req,res);
            }catch(err){                
                res.status(500).json({error:"Internal Server Error"});
            }
            break;
        }
        case "DELETE": {
            try{                
                return deleteBlog(req,res,id);
            }catch(err){
                console.log(err)
                res.status(500).json({error:"Internal Server Error"});
            }
            break;
        }
        default:{
            res.send(400).json({error: "Bad Request"});
        }
    }
}
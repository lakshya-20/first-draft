const jwt = require('jsonwebtoken')
import {User} from '../models/user';

export const requireLogin = async (req,res) =>{
    const {authorization} = req.headers;
    const token = authorization;
    if(!token){
        return res.status(401).json({error:"Access denied. No token provided"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWTSecret);
        var user = await  User.findById(decoded._id);
        user.password = undefined;
        req.user = user;
    }catch(err){
        res.status(401).json({error:"Access denied. Invalid token"});
    }
}

export const requireAPIKey = async (req,res) =>{
    const {apiKey} = req.headers;
    if(apiKey!==process.env.apiKey){
        return res.status(401).json({error:"Access denied"})
    }
    
}
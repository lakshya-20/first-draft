const jwt = require('jsonwebtoken')
import User from '../models/user';

const isValid = (bool) =>{
    return bool; 
}

export const requireLogin = async (req,res) =>{
    const {authorization} = req.headers;
    const token = authorization;
    if(!token){
        return isValid(false);
    }
    try{
        const decoded = jwt.verify(token,process.env.NEXT_PUBLIC_JWTSecret);
        var user = await  User.findById(decoded._id);        
        user.password = undefined;
        req.user = user;
        return isValid(true);
    }catch(err){
        return isValid(false);
    }
}

export const requireAPIKey = async (req,res) =>{
    const {api_key} = req.headers;
    if(api_key!==process.env.NEXT_PUBLIC_apiKey){
        return isValid(false);
    }
    return isValid(true);
}
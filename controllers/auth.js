import {signupValidator, signinValidator} from '@/utils/dataValidators';
import {requireAPIKey, requireLogin} from '@/utils/requestValidators';
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const User = require('@/models/user');
export const signup = async (req,res) =>{
    if(! await requireAPIKey(req, res)){
        return res.status(401).json({error: "Access denied"})
    }
    const {email, password, name, dp} = req.body;
    const {errors, valid} = signupValidator(email,password);
    if(!valid){
        return res.status(422).send({error:Object.values(errors)[0]});
    }
    try{
        const savedUser = await User.findOne({email:email});
        if(savedUser){
            return res.status(422).json({error:"User already exists with that email"});
        }
        var user = new User({
            email,
            password,
            name,
            dp
        })
        user.password = await bcrypt.hash(password,12);
        await user.save();
        user = await User.findOne({email:email});
        user.password= undefined;
        const token = jwt.sign({_id:user._id}, process.env.NEXT_PUBLIC_JWTSecret);
        return res.status(200).json({token, user});        
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export const singin = async(req,res) =>{
    if(! await requireAPIKey(req, res)){
        return res.status(401).json({error: "Access denied"})
    }
    const {email,password} = req.body;
    const {errors, valid} = signinValidator(email,password);
    if(!valid){
        return res.status(422).send({error:Object.values(errors)[0]});
    }
    try{
        const savedUser = await User.findOne({email:email});
        if(!savedUser){
            return res.status(422).json({error:"No account exists with that email"});
        }
        const isMatch = await bcrypt.compare(password, savedUser.password);
        if(!isMatch){
            return res.status(500).json({error:"Invalid Credentials"});
        }
        savedUser.password = undefined;
        const token = jwt.sign({_id: savedUser._id}, process.env.NEXT_PUBLIC_JWTSecret);
        return res.status(200).json({token,user:savedUser});
    }catch(err){
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export const updateUser = async (req, res) => {
    if(!(await requireAPIKey(req, res)&&await requireLogin(req,res))){
        return res.status(401).json({error: "Access denied"})
    }
    try{
        const userId = req.user._id;
        var user = await User.findById(userId);
        user.about = req.body.about;
        user.socialLinks = req.body.socialLinks;
        user = await user.save();
        const {authorization} = req.headers;
        const token = authorization;
        return res.status(200).json({token,user:user});
    } catch(err){
        return res.status(500).json({error:"Internal Server Error"});
    }
}
import {getProfile, updateProfile, deleteProfile} from '@/controllers/profile';
const mongoose = require('mongoose');
const User = require('@/models/user');
const mongoConnection = require ('@/utils/mongoConnection');
export default async function handler (req,res){
    const {query: {id}, method} = req;
    mongoConnection();
    switch(method) {
        case "GET": {
            try{
                if(id) {
                    return getProfile(req,res,id);
                }
                else return res.status(400).json({error:"Bad Request"})
            } catch(err){
                res.status(500).json({error:"Internal Server Error"})
            }
            break;
        }
        case "PUT": {
            try{
                return updateProfile(req,res);
            } catch(err){
                res.status(500).json({error:"Internal Server Error"})
            }
            break;
        }
        case "DELETE": {
            try{
                return deleteProfile(req,res,id);
            } catch(err){
                res.status(500).json({error:"Internal Server Error"})
            }
            break;
        }
        default:{
            res.send(400).json({error: "Bad Requestr"});
        }
    }
}
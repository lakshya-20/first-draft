const mongoConenction = require('@/utils/mongoConnection');
import {signup, singin, updateUser} from '@/controllers/auth';

export default async function handler (req,res) {
    const {query: {action}, method} = req;
    mongoConenction()
    switch(method){
        case "GET": {
            try{
                
            }catch(err){
                res.status(500).json({error:"Internal Server Error"});
            }
            break;
        }
        case "POST": {
            try{                
                if(action == "signin"){             
                    return singin(req,res);
                }
                else{               
                    return signup(req,res);
                }                
            }catch(err){
                res.status(500).json({error:"Internal Server Error"});
            }
            break;
        }
        case "PUT": {
            try{
                return updateUser(req, res);
            }catch(err){
                res.status(500).json({error:"Internal Server Error"});
            }
            break;
        }
        case "DELETE": {
            try{

            }catch(err){
                res.status(500).json({error:"Internal Server Error"});
            }
            break;
        }
        default:{
            res.status(500).json({error:"Invalid request"});
        }
    }
}
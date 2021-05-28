const mongoConenction = require('../../utils/mongoConnection');
import {signup, singin} from '../../controllers/auth';

export default async function handler (req,res) {
    const {query: {action}, method} = req;
    mongoConenction()
    switch(method){
        case "GET": {
            try{
                
            }catch(err){
                res.status(500).send(err.message);
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
                res.status(500).send(err.message);
            }
            break;
        }
        case "PUT": {
            try{

            }catch(err){
                res.status(500).send(err.message);
            }
            break;
        }
        case "DELETE": {
            try{

            }catch(err){
                res.status(500).send(err.message);
            }
            break;
        }
        default:{
            res.send(400).send("Invalid request");
        }
    }
}
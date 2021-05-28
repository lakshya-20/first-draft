const mongoose = require('mongoose');

module.exports = async () =>{
    const mongoURL = process.env.mongoURL;
    try{
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        });
    }catch(err){
        // process.exit(1);
        console.log("MongoDB Server Error");
    }
}
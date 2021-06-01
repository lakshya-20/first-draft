const mongoose  = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = mongoose.Schema({    
    dp: {
        type: String,
        required: false,
        default: "https://res.cloudinary.com/dstmsi8qv/image/upload/v1622557306/First%20Draft/user_default_g613un.png"
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    blogs: [{
        type: ObjectId,
        ref: "Blog"
    }]
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
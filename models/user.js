const mongoose  = require('mongoose');
const userSchema = mongoose.Schema({    
    dp: {
        type: String,
        required: false,
        default: ""
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
    }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const AuthSchema = mongoose.Schema;


const authSchema = new AuthSchema({
    username: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true
    },
    fcmToken: {
        type: String,
        required: true
    },
    userLevel : {
        type: Number,
        required: true,
        default: 0
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    isPhoneNumberVerified: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('AuthSchema', authSchema);
const mongoose = require('mongoose');
const ServerSchema = mongoose.Schema;



const serverSchema = new ServerSchema({
    serverName : {
        type: String,
        required: true,
    },
    region :{
        type: String,
        required: true
    },
    hostname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true,
    },
    flagCode : {
        type: String,
        required: true,
    },
    premium: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {timestamps: true});

module.exports = mongoose.model('ServerSchema', serverSchema)


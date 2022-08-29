const express = require('express');
const router = express.Router();
const serverSchema = require('../models/serverModel');


module.exports.getAll = function(req, res) {
    serverSchema.find().then((result) => {
        res.send(result);
    });
}

module.exports.postServer = (req, res) => {
    const serverBody = new serverSchema(req.body);
    serverBody.save().then((result) => {
        res.status(200).json({
            message: "Server has been Saved",
            serverId : result._id,
            success: true,
        });
    }).catch(err => {
        res.status(500).json({
            message: "Server has not been saved",
            success: false,
        });
    })
}
module.exports.paidServers = (req, res) => {
    serverSchema.find({premium: true}).then((result) => {
     res.send(result);
    })

 }

 module.exports.freeServers = (req, res) => {
    serverSchema.find({premium: false}).then((result) => {
     res.send(result);
    })

 }



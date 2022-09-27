const express = require('express');
const db = require('../utils/database');
const router = express.Router();


module.exports.getAll = function(req, res) {
    db.execute('SELECT * FROM servers').then(([rows, fieldData]) => {
        res.status(200).json({
            success: true,
            data: rows
        })
    }).catch(err => {
        res.status(502).json({
            success: false,
            error: err
        })
    })
}

module.exports.postServer = (req, res) => {

    db.execute("INSERT INTO servers(server_name, region, hostname, server_username, server_password, flag_code, premium_server) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.server_name ,req.body.region, req.body.hostname, req.body.server_username, req.body.server_password, req.body.flag_code, req.body.premium_server]).then(([rows, fieldData]) => {
        res.status(200).json({
            data: rows,
            success: true
        })
    })
    
}
module.exports.paidServers = (req, res) => {

    db.execute("SELECT * FROM servers where premium_server = true").then(([rows, fieldData]) => {
        res.status(200).json({
            success: true,
            data: rows
        })
    }).catch(err => {
        res.status(502).json({
            succuess: false,
            error : err
        })
    })
    

 }

 module.exports.freeServers = (req, res) => {
    
    db.execute("SELECT * FROM servers where premium_server = false").then(([rows, fieldData]) => {
        res.status(200).json({
            success: true,
            data: rows
        })
    }).catch(err => {
        res.status(502).json({
            succuess: false,
            error : err
        })
    })
 }



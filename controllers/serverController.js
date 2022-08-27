const express = require('express');
const router = express.Router();


module.exports.getAll = function(req, res) {
    res.send("Welcome to the Server Endpoint");
}
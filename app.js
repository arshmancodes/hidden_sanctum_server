const express = require('express');
const mongoose = require('mongoose');
const fs = require("fs");
let Client = require('ssh2-sftp-client');
const app = express();
const multer = require("multer");
const { json } = require('body-parser');
const storage = multer.diskStorage({
    destination: function( req, file, cb) {
        cb(null, './ovpns')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
let sftp = new Client();

const upload = multer({
    storage: storage
});

app.get("/", upload.array("ovpns", 2), (req, res) => {
    console.log(req.files);
    res.send("The files have been uploaded");
});

// app.get("/", (req, res) => {
//     res.send("Hello this is working");
// })

app.get("/getOVPN/:ovpnname", (req, res) => {
    const filePath  = "./ovpns/" + req.params.ovpnname + ".ovpn";
    fs.readFile(filePath, (error, data) => {
        if(error)
        {
            console.log(error);
            throw error;
        }
        res.send(data.toString());
    })
    // let rawdata = fs.readFileSync(filePath);
    // console.log(rawdata);
    // let data = JSON.parse(rawdata);
    // res.send(rawdata);
    // const file = './ovpns/ovpnname.ovpn';
    // res.download(filePath);
});

app.get("/createNewServer", (req, res) => {
    try{
        sftp.connect({
            host: "carflexrenalandleasing.com",
            port: '22',
            username: 'root',
            password: 'Arain@123'
        }).then(() => {
            res.send(sftp.list('/pathname'));
        }).then(data => {
            console.log(data, 'the data info');
        }).catch(err => {
            console.log(err, "this is error message");
        });
    }
   catch{
    console.log("Error generated");
   }
})


app.listen(3000, () => {
    console.log("The app is running on 3000");
})
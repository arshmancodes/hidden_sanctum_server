const express = require('express');
const bcrypt = require('bcrypt'); 
const AuthSchema = require('../models/authModel');
const { json } = require('body-parser');


exports.getAll = (req, res, next) => {
    res.send("Hello welcome to auth Endpoint");
}

exports.registerUser =  async(req, res, next) => {

     
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    let emailExists = await AuthSchema.findOne({
        email: req.body.email
    });
    if(emailExists === null)
    {
       let phoneExists = await AuthSchema.findOne({
        mobileNumber: req.body.mobileNumber
       });
       if(phoneExists === null)
       {
        const authBody = new AuthSchema(req.body);
        authBody.save().then((result) => {
            res.status(200).json({
                message: "Account Registered Successfully",
                userId : result._id,
                success : true
            });
        }).catch(err => {
            res.status(500).json({
                error: err,
                success: false
            });
        })
       }
       else
       {
        res.status(400).json({
            error: "An account is already linked with this Number",
            success : false,
        })
       }
    }
    else
    {
       res.status(400).json({
        error: "Email Already Exists",
        success: false
       })
    }
   
}

exports.login = async(req, res, next) => {

    const {email, password, fcmToken} = req.body;

    let auth = await AuthSchema.findOne({email: email});

    if(auth!== null)
    {
        const validPassword = bcrypt.compareSync(password, auth.password);
        if(validPassword) 
        {
            auth.updateOne({fcmToken: fcmToken},).then((result) => {
                auth.fcmToken = fcmToken;
                res.status(200).json(auth);
            }).catch(err => {
                res.status(200).json(auth);
                console.log(err);
            })
        }
        else
        {
            res.status(400).json({
                error: "Invalid Password",
                success: false,
            });
        }
    }
    else
    {
        res.status(400).json({
            error: "Invalid Email or Password",
            success: false,
        })
    }
}
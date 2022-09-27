const db = require('../utils/database');
const nodemailer = require('nodemailer');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const bcrypt = require('bcrypt');



exports.checkUser = (req, res, next) => {
    db.execute("SELECT * FROM users where username = ?", [req.body.username]).then(([rows, fieldData]) => {
        if(rows.length > 0)
        {
            res.status(200).json({
                message: "The username already exists",
                success : false,
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                message: "The username is available",
                data: rows,
            })
        }
        
    })
}

exports.postAuth = (req, res, next) => {


    var name = req.body.name;
    var email_address = req.body.email_address;
    var password = req.body.password;
    
    var fcmToken = req.body.fcmToken;

    const salt = genSaltSync(10);
    password = hashSync(req.body.password, salt);

    db.execute("SELECT * FROM users where email_address =?", [email_address]).then(([rows, fieldData]) => {
        var transporter = nodemailer.createTransport({
            host: "server2.needcloudhost.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
              user: "hsvpn@codeminer.co",
              pass: "CodeMiners@123",
            },
          });
        if(rows.length > 0)
        {
            res.status(200).json({
                success: false,
                message: "Email Already Exists",
            });
        }
        else
        {
            db.execute('INSERT INTO users(name, email_address, password, fcmToken, address, username, phone, isVerified, isPremium, points) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, email_address, password, fcmToken, req.body.address, req.body.username, req.body.phone, req.body.isVerified, req.body.isPremium, req.body.points]).then(([rows, fieldData]) => {
                

      transporter.verify(async function (error, success) {
        if (error) {
            
          console.log(error);
        } else {

           var otp = Math.floor(100000 + Math.random() * 900000)
           var htmlmsg = `<h3>Dear user the One Time Password (OTP) for the Hidden Sanctum VPN account is </h3> </br> <h2> ${otp} </h2>`
            let info = await transporter.sendMail({
                from: '"Hidden Sanctum" <noreply@codeminer.co>', // sender address
                to: req.body.email_address, // list of receivers
                subject: "HS VPN OTP", // Subject line
                text: "Dear user the One Time Password (OTP) for the Hidden Sanctum VPN account is ", // plain text body
                html: htmlmsg, // html body
              });

              console.log("Message sent: %s", info.messageId);
  
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            //res.status(200).send("Email Sent");
        }
      });
                
                res.status(200).json({
                    success: true,
                    data : rows,
                    
                })
            }).catch(err => {
                res.status(200).json({
                    success : false,
                    message: err,
                })
            })
        }
    })

    

}

exports.getAuth = (req, res, next) => {

    db.execute('SELECT * from users').then(([rows, fieldData]) => {
        res.status(200).json(rows);
    }).catch(err => {
        res.status(502).json({
            error: err,
            success: false,
        })
    })
}

exports.login = (req, res, next) => {

    var email_address = req.body.email_address;
    var password = req.body.password;


    db.execute('SELECT * FROM users WHERE email_address=?', [req.body.email_address]).then(([rows, fieldData]) => {
        if(rows.length > 0) 
        {
            const validPassword = compareSync(req.body.password, rows[0].password);
            if(validPassword)
            {
                res.status(200).json({
                    message : 'User logged in Successfully',
                    success: true,
                    data: rows[0],
                    
                })
            }
            else
            {
                res.status(200).json({
                    success: false,
                    message: "User Login failed!, Invalid Username or Password",
                })
            }
        }
        else
        {
            res.status(200).json({
                success: false,
                message: "User not Found"
            })
        }
    })
}

exports.sendMail = (req, res, next) => {
    

    var transporter = nodemailer.createTransport({
        host: "server2.needcloudhost.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "hsvpn@codeminer.co",
          pass: "CodeMiners@123",
        },
      });

      

      transporter.verify(async function (error, success) {
        if (error) {
            
          console.log(error);
        } else {
            let info = await transporter.sendMail({
                from: '"Hiddem Sanctum" <noreply@codeminer.co>', // sender address
                to: email, // list of receivers
                subject: "HS VPN OTP", // Subject line
                text: "Dear user the One Time Password (OTP) for the Hidden Sanctum VPN account is ", // plain text body
                html: "<h3>Dear user the One Time Password (OTP) for the Hidden Sanctum VPN account is</h3>", // html body
              });

              console.log("Message sent: %s", info.messageId);
  
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            res.status(200).send("Email Sent");
        }
      });
}